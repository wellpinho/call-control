"use client";

import { ICustomer, ITicket } from "@/interface";
import { api } from "@/services/api";
import moment from "moment";
import { FiFile, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ModalContext } from "@/providers/modal";

interface Props {
    ticket: ITicket;
    customer: ICustomer;
}

export const TableRowItem = ({ customer, ticket }: Props) => {
    const createdAt = moment(ticket.created_at).format("DD/MM/YYYY");
    const router = useRouter();

    async function handleChangeTicketStatus() {
        try {
            await api.patch("/api/tickets", {
                id: ticket.id,
            });

            router.refresh();
        } catch (error) {
            console.log(error);
        }
    }

    const { handleModalVisible, setDetailTicketToModal } =
        useContext(ModalContext);

    function handleOpenModal() {
        handleModalVisible();
        setDetailTicketToModal({
            customer,
            ticket,
        });
    }

    return (
        <>
            <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300">
                <td className="text-left pl-2">{customer.name}</td>
                <td className="text-left pl-2">{ticket.name}</td>
                <td className="text-left hidden sm:table-cell">{createdAt}</td>
                <td className="text-left">
                    <span className="bg-green-500 px-2 py-1 rounded uppercase text-white">
                        {ticket.status === "open" ? "Aberto" : "Fechado"}
                    </span>
                </td>
                <td className="text-left">
                    <button onClick={handleChangeTicketStatus} className="mr-3">
                        <FiTrash2 size={24} color="#ef4444" />
                    </button>
                    <button onClick={handleOpenModal}>
                        <FiFile size={24} color="#3b82f6" />
                    </button>
                </td>
            </tr>
        </>
    );
};
