import { requireAdmin } from "../../lib/auth";

export const dynamic = "force-dynamic";
export default async function AdminPage() { await requireAdmin(); return <main className="admin-page"><a className="brand" href="/">AN<span>.</span></a><p className="label">Admin dashboard</p><h1>Your portfolio dashboard</h1><p>Secure access is working. Content management for profile, projects, experience, contact details, and résumé upload is being connected next.</p></main>; }
