"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { InputComponent } from "../input";
import { api } from "@/services/api";

interface Props {
    name: string;
    email: string;
    address: string;
    phone: string;
}

const phoneRegExp = /^\(?\d{2}\)?\s?9\d{4}-?\d{4}$/;

const schema = yup
    .object({
        name: yup.string().min(1).required(),
        email: yup.string().required(),
        address: yup.string().required(),
        phone: yup
            .string()
            .matches(phoneRegExp, "Telefone inválido!")
            .required(),
    })
    .required();

export const NewCustomerForm = ({ userId }: { userId: string }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async ({ name, email, address, phone }: Props) => {
        const response = await api.post("/api/customer", {
            name,
            email,
            address,
            phone,
            userId,
        });

        console.log(response);
    };

    return (
        <form className="flex flex-col mt-6" onSubmit={handleSubmit(onSubmit)}>
            <label className="mb-1 text-lg font-medium" htmlFor="">
                Nome e sobrenome
            </label>
            <InputComponent
                name="name"
                placeholder="Digite nome completo"
                errors={errors.name?.message}
                register={register}
                type="text"
            />

            <section className="flex flex-col my-2 sm:flex-row gap-2">
                <div className="flex-1">
                    <label htmlFor="">Email</label>
                    <InputComponent
                        name="email"
                        placeholder="Digite seu email"
                        errors={errors.name?.message}
                        register={register}
                        type="text"
                    />
                </div>

                <div className="flex-1">
                    <label htmlFor="">Telefone</label>
                    <InputComponent
                        name="phone"
                        placeholder="Digite seu telefone"
                        errors={errors.name?.message}
                        register={register}
                        type="number"
                    />
                </div>
            </section>

            <label htmlFor="">Endereço</label>
            <InputComponent
                name="address"
                placeholder="Digite seu endereço"
                errors={errors.name?.message}
                register={register}
                type="text"
            />

            <button
                className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold"
                type="submit"
            >
                Cadastrar
            </button>
        </form>
    );
};
