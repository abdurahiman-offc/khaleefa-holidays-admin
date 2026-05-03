import { verifyAuth } from "@/lib/auth";

import { logout } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST() {
    await logout();
    return NextResponse.json({ success: true }, { status: 200 });
}
