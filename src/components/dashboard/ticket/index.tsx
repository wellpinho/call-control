import { ICustomer, ITicket } from "@/interface";
import moment from "moment";
import { FiFile, FiTrash2 } from "react-icons/fi";

interface Props {
    ticket: ITicket;
    customer: ICustomer;
}

export const TableRowItem = ({ customer, ticket }: Props) => {
    const createdAt = moment(ticket.created_at).format("DD/MM/YYYY");

    console.log("ticket: ", ticket);
    console.log("customer: ", customer);

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
                    <button className="mr-2">
                        <FiTrash2 size={24} color="#ef4444" />
                    </button>
                    <button>
                        <FiFile size={24} color="#3b82f6" />
                    </button>
                </td>
            </tr>
        </>
    );
};
