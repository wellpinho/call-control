/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await auth();

    if (!session) {
        return NextResponse.json(
            { message: "Unauthorized", code: 401 },
            { status: 401 }
        );
    }

    const { name, email, phone, address, userId } = await req.json();

    try {
        await prisma.customer.create({
            data: {
                name,
                email,
                phone,
                address: address || "",
                userId,
            },
        });

        return NextResponse.json(
            { message: "Cliente cadastrado com sucesso" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

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
        const customers = await prisma.customer.findMany({
            where: {
                userId,
            },
        });

        return NextResponse.json(customers);
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get("customerId") as string;
    const removeAll = searchParams.get("removeAll") as string;

    if (!customerId) {
        return NextResponse.json(
            { error: "CustomerId is required" },
            { status: 400 }
        );
    }

    if (removeAll) {
        try {
            await prisma.customer.delete({
                where: {
                    id: customerId,
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

    const tickets = await prisma.tickets.findFirst({
        where: {
            customerId,
        },
    });

    if (tickets) {
        return NextResponse.json({ message: "forbiden" }, { status: 403 });
    }

    try {
        await prisma.customer.delete({
            where: {
                id: customerId,
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
