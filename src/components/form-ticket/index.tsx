"use client";

import { InputComponent } from "@/components/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "@/services/api";

const schema = yup
    .object({
        name: yup.string().required(),
        description: yup.string().required(),
    })
    .required();

type FormData = yup.InferType<typeof schema>;

export const FormTicketComponent = ({ customerId }: { customerId: string }) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const handleRegisterTicket = async (data: FormData) => {
        await api.post("/api/tickets/open", {
            name: data.name,
            description: data.description,
            customerId,
        });

        setValue("name", "");
        setValue("description", "");
    };

    return (
        <form
            onSubmit={handleSubmit(handleRegisterTicket)}
            className="bg-slate-200 mt-6 px-4 py-6 rounded border-2"
        >
            <div className="flex flex-col mb-4">
                <label htmlFor="" className="mb-1 font-medium text-lg">
                    Resumo
                </label>
                <InputComponent
                    name="name"
                    placeholder="Digite resumo do ticket"
                    register={register}
                    type="text"
                    errors={errors.name?.message}
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="" className="mb-1 font-medium text-lg">
                    Descrição do ticket
                </label>
                <textarea
                    id="description"
                    className="w-full border-2 rounded-md h-24 mb-2 p-2"
                    placeholder="Detalhe o porque do ticket"
                    {...register("description")}
                ></textarea>
                {errors.description?.message && (
                    <span className="text-red-400 text-xs mb-4">
                        {errors.description.message}
                    </span>
                )}
            </div>

            <button className="bg-blue-500 rounded-md w-full h-11 px-2 text-white font-bold">
                Criar ticket
            </button>
        </form>
    );
};
