import { ITicket } from "@/interface";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// function createIndexAndLifeTime() {
//     db.Cache.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 3600 })
// }

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
        const tickets = await prisma.tickets.findMany({
            where: {
                userId,
                status: "open",
            },
            include: {
                customer: true,
            },
            orderBy: {
                created_at: "asc",
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

export async function PATCH(req: Request) {
    const { id } = await req.json();

    try {
        await prisma.tickets.update({
            where: {
                id,
            },
            data: {
                status: "closed",
            },
        });

        return NextResponse.json(
            { message: "Ticket status closed" },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Failed delet customer" },
            { status: 400 }
        );
    }
}
