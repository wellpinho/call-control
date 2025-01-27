import Image from "next/image";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh - 80px)]">
            <div className="pt-20 text-center">
                <h2 className="text-2xl md:text-5xl mb-2 text-gray-700 font-bold">
                    Gerencie sua empresa com eficiência
                </h2>
                <h1 className="font-bold text-xl md:text-3xl mb-8 text-blue-500">
                    Organize seus atendimentos e clientes com facilidade
                </h1>

                <div className="flex justify-center pt-8">
                    <Image
                        src={"/assets/hero.svg"}
                        alt="Image hero"
                        width={600}
                        height={600}
                        className="max-w-xs md:max-w-2xl"
                    />
                </div>
            </div>
        </main>
    );
}
