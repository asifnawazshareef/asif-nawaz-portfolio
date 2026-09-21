import LoginForm from "./LoginForm";

export const metadata = { title: "Admin login — Asif Nawaz" };
export default function AdminLogin() { return <main className="login-page"><section><a className="brand" href="/">AN<span>.</span></a><p className="label">Portfolio administration</p><h1>Welcome back.</h1><p>Sign in to update your portfolio, projects, experience and résumé.</p><LoginForm /></section></main>; }
