// se o compoenent for server podemos criar component client e
// chamar dentro do component server
"use client";

import { useRouter } from "next/navigation";
import { FiRefreshCcw } from "react-icons/fi";

export const ButtonRefresh = () => {
    const router = useRouter();

    return (
        <button
            onClick={() => router.refresh()}
            className="bg-gray-600 px-4 py-1 rounded"
        >
            <FiRefreshCcw size={24} color="#fff" />
        </button>
    );
};
