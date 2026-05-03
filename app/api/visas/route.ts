import { verifyAuth } from "@/lib/auth";

import dbConnect from "@/lib/db";
import Visa from "@/models/Visa";
import { NextResponse } from "next/server";

export async function GET() {
    if (!(await verifyAuth())) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    await dbConnect();
    try {
        const visas = await Visa.find({});
        return NextResponse.json({ success: true, data: visas });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}

export async function POST(request: Request) {
    if (!(await verifyAuth())) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    await dbConnect();
    try {
        const body = await request.json();
        const visa = await Visa.create(body);
        return NextResponse.json({ success: true, data: visa }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 400 });
    }
}
