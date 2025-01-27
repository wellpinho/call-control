export interface ICustomer {
    id?: string;
    name: string;
    email: string;
    phone: number;
    address?: string;
    userId: string;
}

export interface ITicket {
    id: string;
    name: string;
    description: string;
    customerId: string;
    userId: string;
    status: string;
    created_at?: Date;
}

export interface IModalContext {
    visible: boolean;
    ticket: ITicketInfo | undefined;
    handleModalVisible: () => void;
    setDetailTicketToModal: (detail: ITicketInfo) => void;
}

export interface ITicketInfo {
    ticket: ITicket;
    customer: ICustomer;
}
