"use server";

import { ContainerLayout } from "@/components/container";
import { NewCustomerForm } from "@/components/form";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

// private page
export default async function NewCustomer() {
    const session = await auth();

    if (!session) {
        redirect("/");
    }

    return (
        <ContainerLayout>
            <main className="flex flex-col mt-9 mb-2">
                <div className="flex items-center gap-3">
                    <Link
                        className="bg-gray-800 px-4 py-1 text-white rounded"
                        href={"/dashboard/customer"}
                    >
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold">Novo cliente</h1>
                </div>

                <NewCustomerForm userId={session.user.id} />
            </main>
        </ContainerLayout>
    );
}
