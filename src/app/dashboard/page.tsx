import { ContainerLayout } from "@/components/container";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await auth();

    if (!session) {
        redirect("/");
    }

    return (
        <ContainerLayout>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </ContainerLayout>
    );
}
