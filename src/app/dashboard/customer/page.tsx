import { ContainerLayout } from "@/components/container";
import { CardCustomerComponent } from "@/components/dashboard/card";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CustomerDashboard() {
    const session = await auth();

    if (!session) {
        redirect("/");
    }

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
                    <CardCustomerComponent />
                    <CardCustomerComponent />
                    <CardCustomerComponent />
                </section>
            </main>
        </ContainerLayout>
    );
}
