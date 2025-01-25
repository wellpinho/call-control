import { ContainerLayout } from "@/components/container";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CustomerDashboard() {
    const session = await auth();

    if (!session) {
        redirect("/");
    }

    return (
        <ContainerLayout>
            <main>
                <div>
                    <h1>Meus clientes</h1>
                </div>
            </main>
        </ContainerLayout>
    );
}
