
import dbConnect from "@/lib/db";
import Room from "@/models/Room";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();
    try {
        const rooms = await Room.find({});
        return NextResponse.json({ success: true, data: rooms });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const room = await Room.create(body);
        return NextResponse.json({ success: true, data: room }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 400 });
    }
}
