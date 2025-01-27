import { ContainerLayout } from "@/components/container";
import { TableRowItem } from "@/components/dashboard/ticket";
import { auth } from "@/lib/auth";
import { api } from "@/services/api";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await auth();

    if (!session) {
        redirect("/");
    }

    const response = await api.get("/api/tickets", {
        params: {
            userId: session?.user.id,
        },
    });

    const tickets = [];

    if (response.status === 200) {
        tickets.push(response.data);
    }

    return (
        <ContainerLayout>
            <main className="mt-2 mb-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Chamados</h1>
                    <Link
                        href={"/dashboard/new"}
                        className="bg-blue-500 px-4 py-1 rounded text-white"
                    >
                        Abrir chamado
                    </Link>
                </div>
                <table className="min-w-full my-2">
                    <thead>
                        <tr>
                            <th className="font-medium text-left uppercase pl-1">
                                Cliente
                            </th>
                            <th className="font-medium text-left uppercase pl-1">
                                Tipo
                            </th>
                            <th className="font-medium text-left uppercase hidden sm:block">
                                Data Cadastro
                            </th>
                            <th className="font-medium text-left uppercase">
                                status
                            </th>
                            <th className="font-medium text-left">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket) => (
                            <TableRowItem
                                key={ticket.id}
                                ticket={ticket}
                                customer={ticket.customer}
                            />
                        ))}
                    </tbody>
                </table>
            </main>
        </ContainerLayout>
    );
}
