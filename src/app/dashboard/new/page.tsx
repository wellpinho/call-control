import { ContainerLayout } from "@/components/container";
import { auth } from "@/lib/auth";
import { api } from "@/services/api";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ICustomer } from "@/interface";

export default async function NewTicket() {
    const session = await auth();

    if (!session) {
        redirect("/");
    }

    const response = await api.get("/api/customer", {
        params: {
            userId: session.user.id,
        },
    });

    const customers: ICustomer[] = response.data;

    // esta função é feita e renderizada apenas no lado servidor
    // caso precise suar uma função do lado servidor é preciso de um hook com a flag "use server"
    async function handleCreateTicket(formData: FormData) {
        "use server";

        const name = formData.get("name");
        const description = formData.get("description");
        const customerId = formData.get("customerId");

        if (!name || !description || !customerId) {
            return;
        }

        const response = await api.post(
            "/api/tickets",
            {
                name,
                description,
                customerId,
            },
            {
                params: {
                    userId: session?.user.id,
                },
            }
        );

        if (response.status === 201) {
            return redirect("/dashboard");
        }
    }

    return (
        <ContainerLayout>
            <main className="mt-9 mb-2">
                <div className="flex items-center gap-3">
                    <Link
                        className="text-white px-4 py-1 rounded bg-gray-800"
                        href={"/dashboard"}
                    >
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold">
                        Criar um novo chamado
                    </h1>
                </div>

                {/* criando form aqui para testar tudo no server component */}
                {/* vmaos usar server action aqui */}
                <form
                    className="flex flex-col mt-6"
                    action={handleCreateTicket}
                >
                    <div className="flex items-center gap-2">
                        <div className="flex-col w-[70%]">
                            <label
                                htmlFor=""
                                className="mb-1 font-medium text-lg"
                            >
                                Nome do chamado
                            </label>
                            <input
                                className="w-full border-2 rounded-md px-2 mb-2 h-11"
                                type="text"
                                name="name"
                                placeholder="Digite nome do chamado"
                                required
                            />
                        </div>

                        {customers && (
                            <div className="flex flex-col w-[30%]">
                                <label
                                    htmlFor=""
                                    className="mb-1 font-medium text-lg"
                                >
                                    Selecione o cliente
                                </label>
                                <select
                                    name="customerId"
                                    className="w-full border-2 rounded-md px-2 mb-2 h-11 resize-none bg-white"
                                >
                                    {customers.map((customer: ICustomer) => (
                                        <option
                                            key={customer.id}
                                            value={customer.id}
                                        >
                                            {customer.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    <label htmlFor="" className="mb-1 font-medium text-lg">
                        Descreva o problema
                    </label>
                    <textarea
                        name="description"
                        className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
                        placeholder="Descreva o problema"
                        required
                    ></textarea>

                    {!customers && (
                        <span>
                            Você ainda não tem nenhum cliente.{" "}
                            <Link href={"/dashboard/customer/new"}>
                                <strong className="text-blue-500">
                                    Cadastrar cliente
                                </strong>
                            </Link>
                        </span>
                    )}

                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold h-11 rounded-md my-4 px-2 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-600"
                        disabled={customers.length === 0}
                    >
                        Cadastrar
                    </button>
                </form>
            </main>
        </ContainerLayout>
    );
}
