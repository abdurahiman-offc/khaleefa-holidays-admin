import { cookies } from "next/headers";
import { encrypt, decrypt } from "./jwt";

const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin@khaleefa6009";

export async function login(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    if (email === ADMIN_USER && password === ADMIN_PASSWORD) {
        const user = { email: ADMIN_USER, name: "Admin" };
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
        const session = await encrypt({ user, expires });

        (await cookies()).set("session", session, { 
            expires, 
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/"
        });
        return true;
    }
    return false;
}

export async function logout() {
    (await cookies()).set("session", "", { expires: new Date(0), path: "/" });
}

export async function getSession() {
    const session = (await cookies()).get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function verifyAuth() {
    const session = (await cookies()).get("session")?.value;
    if (!session) return false;
    const decoded = await decrypt(session);
    return !!decoded;
}
