import { verifyAuth } from "@/lib/auth";

import dbConnect from "@/lib/db";
import Destination from "@/models/Destination";
import { NextResponse } from "next/server";

export async function GET() {
    if (!(await verifyAuth())) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    await dbConnect();
    try {
        const destinations = await Destination.find({});
        return NextResponse.json({ success: true, data: destinations });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}

export async function POST(request: Request) {
    if (!(await verifyAuth())) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    await dbConnect();
    try {
        const body = await request.json();
        const destination = await Destination.create(body);
        return NextResponse.json({ success: true, data: destination }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 400 });
    }
}
