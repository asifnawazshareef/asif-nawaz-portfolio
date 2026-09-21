import { neon } from "@neondatabase/serverless";

export type Profile = { full_name: string; title: string; location: string; email: string; intro: string; availability: string; resume_url: string | null; github_url: string | null; linkedin_url: string | null };
export type Project = { id: string; name: string; summary: string; url: string | null; category: string; technologies: string[] };
export type Experience = { id: string; company: string; role: string; location: string | null; start_date: string; end_date: string | null; is_current: boolean; description: string };

const fallbackProfile: Profile = { full_name: "Asif Nawaz Sharif", title: "Frontend Engineer", location: "Islamabad, Pakistan", email: "asifnawazshareef@gmail.com", intro: "I build responsive, scalable interfaces with React, Next.js, TypeScript and thoughtful product design.", availability: "Open to frontend opportunities", resume_url: null, github_url: "https://github.com/asifnawazshareef", linkedin_url: null };
const fallbackProjects: Project[] = [
  { id: "1", name: "SmartParho", category: "Education platform", summary: "Resource discovery platform for Pakistan boards, built for fast search and resilient document delivery.", url: "https://smartparho.com", technologies: ["Next.js", "PostgreSQL", "Meilisearch"] },
  { id: "2", name: "SmartStudyBooks", category: "Learning catalogue", summary: "A searchable catalogue helping learners find age-appropriate academic resources.", url: "https://smartstudybooks.com", technologies: ["Next.js", "Cloudflare R2", "Tailwind"] },
];
const fallbackExperience: Experience[] = [
  { id:"1", company:"Tecklogics IT Solutions", role:"Software Engineer, Frontend", location:"Islamabad", start_date:"2026-03-01", end_date:null, is_current:true, description:"Building React-based frontend applications and QA-focused product experiences." },
  { id:"2", company:"Smart Coders", role:"Frontend React Developer", location:"Islamabad", start_date:"2023-09-01", end_date:"2025-03-01", is_current:false, description:"Built reusable React interfaces, state management, API integrations and responsive UI systems." },
];

export async function portfolioData() {
  if (!process.env.DATABASE_URL) return { profile: fallbackProfile, projects: fallbackProjects, experience: fallbackExperience };
  try {
    const sql = neon(process.env.DATABASE_URL);
    const [profiles, projects, experience] = await Promise.all([
      sql`SELECT full_name, title, location, email, intro, availability, resume_url, github_url, linkedin_url FROM site_profile WHERE id = 1`,
      sql`SELECT id, name, summary, url, category, technologies FROM projects WHERE featured = true ORDER BY sort_order ASC, created_at DESC`,
      sql`SELECT id, company, role, location, start_date::text, end_date::text, is_current, description FROM experiences ORDER BY sort_order ASC, start_date DESC`,
    ]);
    return { profile: (profiles[0] as Profile | undefined) ?? fallbackProfile, projects: projects as Project[], experience: experience as Experience[] };
  } catch { return { profile: fallbackProfile, projects: fallbackProjects, experience: fallbackExperience }; }
}
