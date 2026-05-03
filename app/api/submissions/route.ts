import { verifyAuth } from "@/lib/auth";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Submission from "@/models/Submission";

export async function POST(req: Request) {
    if (!(await verifyAuth())) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    await dbConnect();
    try {
        const body = await req.json();
        const submission = await Submission.create(body);
        return NextResponse.json({ success: true, data: submission }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function GET() {
    if (!(await verifyAuth())) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    await dbConnect();
    try {
        const submissions = await Submission.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: submissions });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(req: Request) {
    if (!(await verifyAuth())) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (id) {
            const deletedSubmission = await Submission.findByIdAndDelete(id);
            if (!deletedSubmission) {
                return NextResponse.json({ success: false, error: "Submission not found" }, { status: 404 });
            }
            return NextResponse.json({ success: true, data: {} });
        } else {
            await Submission.deleteMany({});
            return NextResponse.json({ success: true, message: "All submissions cleared" });
        }
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
