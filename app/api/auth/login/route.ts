
import { login } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const success = await login(formData);

        if (success) {
            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
