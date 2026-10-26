import Link from "next/link";
export default function Home() {
  return <main style={{ fontFamily: "Arial, sans-serif", maxWidth: 760, margin: "80px auto", padding: 24 }}>
    <p style={{ color: "#087f8c", fontWeight: 700, letterSpacing: 2 }}>VOLLEY PRO / CMS</p>
    <h1>Панель керування командою</h1>
    <p>Керуйте гравцями, тренуваннями, змаганнями та публічним контентом через Payload CMS.</p>
    <Link href="/admin" style={{ display: "inline-block", padding: "12px 18px", background: "#087f8c", color: "white", borderRadius: 8, textDecoration: "none" }}>Відкрити адмін-панель</Link>
  </main>;
}
