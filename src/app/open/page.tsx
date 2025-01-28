"use client";

import { InputComponent } from "@/components/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiSearch, FiX } from "react-icons/fi";
import { useState } from "react";
import { ISeller } from "@/interface";
import { FormTicketComponent } from "@/components/form-ticket";
import { api } from "@/services/api";

const schema = yup
    .object({
        email: yup.string().email().required(),
    })
    .required();
type FormData = yup.InferType<typeof schema>;

export default function App() {
    const [customer, setCustomer] = useState<ISeller | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue, // é onde mantem o histórico do input
        setError,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });
    const handleSearchCustomer = async (data: FormData) => {
        const response = await api.get("/api/customer/open", {
            params: {
                email: data.email,
            },
        });

        if (!response.data.length || !response.data) {
            setError("email", {
                type: "custom",
                message:
                    "Vendedor não encontrado. Verifique o email e tente novamente",
            });
            return;
        }

        setCustomer({ id: response.data[0].id, name: response.data[0].name });
    };

    console.log(customer);

    function handleClearCustomer() {
        setCustomer(null);
        setValue("email", "");
    }

    return (
        <div className="w-full max-w-2xl mx-auto px-2">
            <h1 className="font-bold text-3xl text-center mt-24">
                Abrir um Ticket
            </h1>

            <main className="flex flex-col mt-4 mb-2">
                {customer ? (
                    <div className="bg-slate-200 py-6 px-4 rounded border-2 flex items-center justify-between">
                        <p className="text-base">
                            <strong>Você selecionou: </strong>
                            <span>{customer.name}</span>
                        </p>
                        <button
                            onClick={handleClearCustomer}
                            className="h-11 px-2 flex items-center justify-center rounded"
                        >
                            <FiX
                                size={24}
                                className="text-red-500 hover:border border-red-300 rounded-full hover:p-1 transition-all"
                            />
                        </button>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit(handleSearchCustomer)}
                        className="bg-slate-200 py-6 px-2 rounded"
                    >
                        <div className="flex flex-col">
                            <small className="text-gray-600 mb-2 text-center">
                                Pata teste use este email:{" "}
                                <strong>test@test.com</strong>
                            </small>
                            <InputComponent
                                name="email"
                                placeholder="Digite email do lojista"
                                register={register}
                                type="text"
                                errors={errors.email?.message}
                            />

                            <button
                                type="submit"
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    text-white
                                    w-full
                                    h-11
                                    mt-2
                                    bg-blue-500
                                    rounded
                                    font-bold
                                "
                            >
                                Procurar vendedor
                                <FiSearch size={24} />
                            </button>
                        </div>
                    </form>
                )}
            </main>

            {customer && <FormTicketComponent customerId={customer.id} />}
        </div>
    );
}
