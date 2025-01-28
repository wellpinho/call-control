import { ITicket } from "@/interface";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { name, description, customerId }: ITicket = await req.json();

    if (!name || !description || !customerId) {
        return NextResponse.json(
            { message: "Failed create new ticket" },
            { status: 400 }
        );
    }

    try {
        await prisma.tickets.create({
            data: {
                name,
                description,
                customerId,
                status: "open",
            },
        });

        return NextResponse.json(
            { message: "Ticket criado com sucesso" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}
