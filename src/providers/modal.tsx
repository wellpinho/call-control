"use client";

import { ModalComponent } from "@/components/modal";
import { IModalContext, ITicketInfo } from "@/interface";
import { ReactNode, createContext, useState } from "react";

export const ModalContext = createContext({} as IModalContext);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [visible, setVisible] = useState(false);
    const [ticket, setTicket] = useState<ITicketInfo>();

    function handleModalVisible() {
        setVisible(!visible);
    }

    function setDetailTicketToModal(detail: ITicketInfo) {
        console.log(detail);
        setTicket(detail);
    }

    return (
        <ModalContext
            value={{
                visible,
                handleModalVisible,
                ticket,
                setDetailTicketToModal,
            }}
        >
            {visible && <ModalComponent />}
            {children}
        </ModalContext>
    );
};
