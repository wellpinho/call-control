import { ContainerLayout } from "@/components/container";
import { CardCustomerComponent } from "@/components/dashboard/card";
import { ICustomer } from "@/interface";
import { auth } from "@/lib/auth";
import { api } from "@/services/api";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CustomerDashboard() {
    const session = await auth();

    if (!session) {
        redirect("/");
    }

    const response = await api.get("/api/customer", {
        params: {
            userId: session.user.id,
        },
    });
    const customers = response.data;

    return (
        <ContainerLayout>
            <main className="mt-9 mb-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Meus clientes</h1>
                    <Link
                        className="bg-blue-500 text-white px-4 py-1 rounded"
                        href={"/dashboard/customer/new"}
                    >
                        Novo cliente
                    </Link>
                </div>

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
                    {customers.map((customer: ICustomer, index: number) => (
                        <CardCustomerComponent
                            customer={customer}
                            key={index}
                        />
                    ))}
                </section>
                {!customers.length && (
                    <h1 className="text-gray-600">
                        Você ainda não possui nenhum cliente
                    </h1>
                )}
            </main>
        </ContainerLayout>
    );
}
