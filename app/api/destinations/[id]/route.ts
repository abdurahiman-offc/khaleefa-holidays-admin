import { verifyAuth } from "@/lib/auth";

import dbConnect from "@/lib/db";
import Destination from "@/models/Destination";
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
        const destination = await Destination.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        if (!destination) {
            return NextResponse.json({ success: false }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: destination });
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
        const deletedDestination = await Destination.deleteOne({ _id: id });
        if (!deletedDestination) {
            return NextResponse.json({ success: false }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}
