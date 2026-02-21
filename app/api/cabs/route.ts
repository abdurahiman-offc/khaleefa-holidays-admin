
import dbConnect from "@/lib/db";
import Cab from "@/models/Cab";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();
    try {
        const cabs = await Cab.find({});
        return NextResponse.json({ success: true, data: cabs });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const cab = await Cab.create(body);
        return NextResponse.json({ success: true, data: cab }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 400 });
    }
}
