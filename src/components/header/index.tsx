"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FiLoader, FiLock, FiLogOut, FiUser } from "react-icons/fi";

export const HeaderComponent = () => {
    const { status, data } = useSession();

    async function handleLogin() {
        await signIn();
    }
    async function handlLogout() {
        await signOut();
    }

    return (
        <div className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm">
            <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
                <Link href={"/"}>
                    <h1 className="font-bold text-2xl pl-1 hover:tracking-widest duration-300">
                        <span className="text-blue-500">CALL</span> CONTROL
                    </h1>
                </Link>

                {status === "loading" && (
                    <button className="animate-spin">
                        <FiLoader size={26} color="#4b5563" />
                    </button>
                )}

                {status === "unauthenticated" && (
                    <button onClick={handleLogin}>
                        <FiLock size={26} color="#4b5563" />
                    </button>
                )}

                {status === "authenticated" && (
                    <div className="flex items-baseline gap-4">
                        <Link href={"/dashboard"}>
                            <FiUser size={26} color="#4b5563" />
                        </Link>
                        <button onClick={handlLogout}>
                            <FiLogOut size={26} color="#4b5563" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
