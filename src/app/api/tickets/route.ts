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
