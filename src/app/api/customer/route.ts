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
