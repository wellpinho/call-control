"use client";

import { ModalContext } from "@/providers/modal";
import { MouseEvent, useContext, useRef } from "react";
import { RiCloseLargeFill } from "react-icons/ri";

export const ModalComponent = () => {
    const { handleModalVisible, ticket } = useContext(ModalContext);
    const modalRef = useRef<HTMLDivElement | null>(null);

    // Se não clicou dentro do modal ele fecha o modal
    const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            handleModalVisible();
        }
    };

    return (
        <div
            onClick={handleModalClick}
            className="absolute bg-gray-900/80 w-full min-h-screen"
        >
            <div className="absolute inset-0 flex items-center justify-center">
                <div
                    ref={modalRef}
                    className="
                        bg-white
                        shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)]
                        w-full
                        max-w-2xl
                        rounded-lg
                        overflow-hidden
                        md:mx-auto
                        mx-2
                    "
                >
                    <div className="p-6">
                        <div className="flex justify-between">
                            <h3 className="text-xl font-semibold text-gray-800 ">
                                Detalhes do ticket
                            </h3>
                            <button onClick={handleModalVisible}>
                                <RiCloseLargeFill
                                    size={24}
                                    className="hover:border rounded-full p-1"
                                />
                            </button>
                        </div>

                        <div className="flex flex-col border-b py-4 text-gray-600">
                            <span className="flex gap-2 ">
                                <strong>Título:</strong> {ticket?.ticket.name}
                            </span>
                            <p className="mt-2 text-sm ">
                                <strong>Descrição:</strong>{" "}
                                {ticket?.ticket.description}
                            </p>
                        </div>

                        <div className="flex flex-col py-4">
                            <strong className="text-gray-800 text-xl font-semibold pb-2">
                                Detalhes do cliente
                            </strong>
                            <div className="text-gray-600">
                                <span className="flex gap-2">
                                    <strong>Nome:</strong>{" "}
                                    {ticket?.customer.name}
                                </span>
                                <span className="flex gap-2">
                                    <strong>Telefone:</strong>{" "}
                                    {ticket?.customer.phone}
                                </span>
                                <span className="flex gap-2">
                                    <strong>Email: </strong>{" "}
                                    {ticket?.customer.email}
                                </span>

                                {ticket?.customer.address && (
                                    <span className="flex gap-2">
                                        <strong>Endereço: </strong>{" "}
                                        {ticket?.customer.address}
                                    </span>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handleModalVisible}
                            type="button"
                            className="mt-4 px-5 py-2.5 rounded-lg text-white text-sm tracking-wider border-none outline-none bg-red-600 hover:bg-red-700"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
