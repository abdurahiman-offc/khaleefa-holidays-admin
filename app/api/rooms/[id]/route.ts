import { verifyAuth } from "@/lib/auth";

import dbConnect from "@/lib/db";
import Room from "@/models/Room";
import { NextResponse } from "next/server";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!(await verifyAuth())) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    await dbConnect();
    const { id } = await params;
    try {
        const body = await request.json();
        const room = await Room.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        if (!room) {
            return NextResponse.json({ success: false }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: room });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!(await verifyAuth())) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    await dbConnect();
    const { id } = await params;
    try {
        const deletedRoom = await Room.deleteOne({ _id: id });
        if (!deletedRoom) {
            return NextResponse.json({ success: false }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}
