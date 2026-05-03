import { verifyAuth } from "@/lib/auth";

import dbConnect from "@/lib/db";
import Cab from "@/models/Cab";
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
        const cab = await Cab.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        if (!cab) {
            return NextResponse.json({ success: false }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: cab });
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
        const deletedCab = await Cab.deleteOne({ _id: id });
        if (!deletedCab) {
            return NextResponse.json({ success: false }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}
