import { portfolioData } from "../lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { profile, projects, experience } = await portfolioData();
  return <main>
    <nav><a className="brand" href="#top">AN<span>.</span></a><div><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></div><a className="talk" href={`mailto:${profile.email}`}>Let&apos;s talk ↗</a></nav>
    <section id="top" className="hero"><p className="status"><i /> {profile.availability}</p><p className="location">{profile.location} · {profile.title}</p><h1>I build digital products that feel <em>clear, useful</em> and considered.</h1><div className="intro"><p>{profile.intro}</p><a href="#work" aria-label="See selected work">↓</a></div></section>
    <section id="work" className="section"><p className="label">01 / Selected work</p><div className="list">{projects.map((p,i)=><article key={p.id}><small>0{i+1}</small><div><p className="muted">{p.category}</p><h2>{p.name}</h2><p>{p.summary}</p><div className="tags">{p.technologies.map(t=><span key={t}>{t}</span>)}</div></div>{p.url && <a className="open" href={p.url} target="_blank">↗</a>}</article>)}</div></section>
    <section id="about" className="section"><p className="label">02 / About me</p><div><h2 className="large">I care about the details that turn a functional interface into a confident experience.</h2><p className="bodycopy">I bring product thinking, accessible frontend engineering, and a pragmatic approach to performance. I enjoy making complex workflows feel simple—from the first screen to the final interaction.</p><div className="skills"><div><b>Frontend</b><p>React, Next.js, TypeScript, Tailwind</p></div><div><b>Data & APIs</b><p>REST, RTK Query, TanStack Query, PostgreSQL</p></div><div><b>UI systems</b><p>Shadcn UI, MUI, Responsive design</p></div></div></div></section>
    <section className="section"><p className="label">03 / Experience</p><div className="timeline">{experience.map(e=><article key={e.id}><p>{new Date(e.start_date).getFullYear()} — {e.is_current ? "Present" : new Date(e.end_date!).getFullYear()}</p><div><h3>{e.role}</h3><span>{e.company} · {e.location}</span><p>{e.description}</p></div></article>)}</div></section>
    <section id="contact" className="contact"><p className="status"><i /> Have a role or product in mind?</p><h2>Let&apos;s make something <em>good</em> together.</h2><a href={`mailto:${profile.email}`}>{profile.email} ↗</a><footer><span>© {new Date().getFullYear()} {profile.full_name}</span><span>{profile.location}</span></footer></section>
  </main>;
}
