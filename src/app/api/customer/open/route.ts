/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
        return NextResponse.json(
            { message: "User not found", code: 400 },
            { status: 400 }
        );
    }

    try {
        const customer = await prisma.customer.findMany({
            where: {
                email,
            },
        });

        return NextResponse.json(customer);
    } catch (error) {
        return NextResponse.json(
            { message: "User not found" },
            { status: 400 }
        );
    }
}
