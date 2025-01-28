/* eslint-disable @typescript-eslint/no-unused-vars */
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
                status: "open",
                customer: {
                    userId,
                },
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
        return NextResponse.json(
            { error: "Failed delet customer" },
            { status: 400 }
        );
    }
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get("customerId");

    if (!customerId) {
        return NextResponse.json(
            { error: "CustomerId is required" },
            { status: 400 }
        );
    }

    try {
        await prisma.tickets.deleteMany({
            where: {
                customerId,
            },
        });

        return NextResponse.json({ message: "User removed successfully" });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed delet customer" },
            { status: 400 }
        );
    }
}
