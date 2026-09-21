"use server";

import { redirect } from "next/navigation";
import { createAdminSession } from "../../lib/auth";

export async function login(_: { error: string }, formData: FormData): Promise<{ error: string }> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.AUTH_SECRET) return { error: "Admin access is still being configured. Please try again shortly." };
  if (email !== process.env.ADMIN_EMAIL.toLowerCase() || password !== process.env.ADMIN_PASSWORD) return { error: "The email or password is incorrect." };
  await createAdminSession(email);
  redirect("/admin");
}
