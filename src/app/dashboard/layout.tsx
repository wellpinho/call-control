import { HeaderDashboardComponent } from "@/components/dashboard/header";
import { ReactNode } from "react";

export default function LayoutDashboard({ children }: { children: ReactNode }) {
    return (
        <>
            <HeaderDashboardComponent />
            {children}
        </>
    );
}
