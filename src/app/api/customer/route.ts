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

        return NextResponse.json({ message: "Cliente cadastrado com sucesso" });
    } catch (error) {
        return error;
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
        console.log(error);
        return NextResponse.json(error);
    }
}

export async function DELETE(req: Request) {
    const session = await auth();

    if (!session) {
        return NextResponse.json(
            { message: "Unauthorized", code: 401 },
            { status: 401 }
        );
    }

    // http://localhost:3000/api/customer?id=123
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id") as string;

    if (!userId) {
        return NextResponse.json(
            { error: "Failed delet customer" },
            { status: 400 }
        );
    }

    const tickets = await prisma.tickets.findFirst({
        where: {
            id: userId,
        },
    });

    if (tickets) {
        return NextResponse.json(403);
    }

    try {
        await prisma.customer.delete({
            where: {
                id: userId,
            },
        });

        return NextResponse.json({ message: "User removed successfully" });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Failed delet customer" },
            { status: 400 }
        );
    }
}
