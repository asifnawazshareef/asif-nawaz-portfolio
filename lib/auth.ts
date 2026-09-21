import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieName = "portfolio_admin_session";
const secret = () => new TextEncoder().encode(process.env.AUTH_SECRET);

export async function createAdminSession(email: string) {
  if (!process.env.AUTH_SECRET) throw new Error("Admin authentication is not configured yet.");
  const token = await new SignJWT({ email, role: "admin" }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("8h").sign(secret());
  const store = await cookies();
  store.set(cookieName, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 60 * 60 * 8, path: "/" });
}

export async function requireAdmin() {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token || !process.env.AUTH_SECRET) redirect("/admin/login");
  try {
    const { payload } = await jwtVerify(token, secret());
    if (payload.email !== process.env.ADMIN_EMAIL || payload.role !== "admin") redirect("/admin/login");
  } catch { redirect("/admin/login"); }
}
