import { ITicket } from "@/interface";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") as string;

    if (!userId) {
        return NextResponse.json(
            { message: "Unauthorized", code: 401 },
            { status: 401 }
        );
    }

    try {
        const tickets = await prisma.tickets.findFirst({
            where: {
                userId,
            },
        });

        if (!tickets) {
            return NextResponse.json(false);
        }

        return NextResponse.json(tickets);
    } catch (error) {
        return NextResponse.json(error);
    }
}

export async function POST(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") as string;

    if (!userId) {
        return NextResponse.json(
            { message: "Unauthorized", code: 401 },
            { status: 401 }
        );
    }

    const { name, description, customerId }: ITicket = await req.json();
    console.log(name, description, userId, customerId);
    try {
        await prisma.tickets.create({
            data: {
                name,
                description,
                userId,
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
