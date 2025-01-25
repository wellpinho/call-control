export const CardCustomerComponent = () => {
    return (
        <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
            <h2>
                <strong>Nome:</strong> Mercado Silva
            </h2>
            <p>
                <strong>Email: </strong>test@test.com
            </p>
            <p>
                <strong>Telefone: </strong>55xxxxxxxxxxx
            </p>
            <button className="bg-red-500 px-4 rounded text-white mt-2 self-start">
                Deletar
            </button>
        </article>
    );
};
