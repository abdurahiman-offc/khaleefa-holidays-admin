import { verifyAuth } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Feedback from "@/models/Feedback";
import { NextResponse } from "next/server";

export async function GET() {
    if (!(await verifyAuth())) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    await dbConnect();
    try {
        const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: feedbacks });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}

export async function POST(request: Request) {
    if (!(await verifyAuth())) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    await dbConnect();
    try {
        const body = await request.json();
        const feedback = await Feedback.create(body);
        return NextResponse.json({ success: true, data: feedback }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 400 });
    }
}
export async function DELETE(request: Request) {
    if (!(await verifyAuth())) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (id) {
            await Feedback.findByIdAndDelete(id);
        } else {
            await Feedback.deleteMany({});
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}
