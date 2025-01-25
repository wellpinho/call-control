/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface Props {
    type: string;
    placeholder: string;
    name: string;
    register: UseFormRegister<any>;
    errors?: string;
    rules?: RegisterOptions;
}
export const InputComponent = ({
    placeholder,
    name,
    register,
    type,
    errors,
    rules,
}: Props) => {
    return (
        <>
            <input
                className="w-full border-2 rounded-md h-11 px-2"
                type={type}
                placeholder={placeholder}
                {...register(name, rules)}
                id={name}
            />
            {errors && (
                <span className="text-red-400 my-1 ml-1 text-xs">{errors}</span>
            )}
        </>
    );
};
