import Link from "next/link";
import { getPlayers, getTrainings, getCompetitions } from "../lib/api";
import type { Player, Training, Competition } from "../types/api";

async function safeFetch<T>(fn: () => Promise<{ data: T[]; total: number }>) {
  try { return await fn(); } catch { return { data: [] as T[], total: 0 }; }
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Дата уточнюється" : new Intl.DateTimeFormat("uk-UA", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(date);
}

export default async function HomePage() {
  const [players, trainings, competitions] = await Promise.all([
    safeFetch<Player>(getPlayers), safeFetch<Training>(getTrainings), safeFetch<Competition>(getCompetitions)
  ]);
  const nextTraining = trainings.data[0];
  const nextMatch = competitions.data.find(match => match.status === "upcoming");
  return <main>
    <nav className="nav wrap"><Link className="brand" href="/">VOLLEY<span>PRO</span></Link><div className="nav-links"><a href="#team">Команда</a><a href="#training">Тренування</a><a href="#matches">Змагання</a><a className="nav-admin" href={`${process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3001"}/admin`}>CMS ↗</a></div></nav>
    <section className="hero">
      <div className="hero-glow" />
      <div className="wrap hero-inner">
        <div className="eyebrow"><span className="live-dot" /> СЕЗОН · 2026 / 2027</div>
        <h1>Сильна команда.<br/><em>Спільна мета.</em></h1>
        <p className="hero-copy">Плануємо кожне тренування. Готуємося до кожного матчу. Зростаємо разом — на майданчику й поза ним.</p>
        <div className="hero-actions"><a className="button button-primary" href="#training">План тренувань <span>↗</span></a><a className="button button-ghost" href="#team">Познайомитись із командою</a></div>
        <div className="hero-stats"><div><strong>{players.total || "—"}</strong><span>Гравців у складі</span></div><div><strong>{trainings.total || "—"}</strong><span>Тренувань у плані</span></div><div><strong>{competitions.total || "—"}</strong><span>Подій у календарі</span></div></div>
      </div>
      <div className="hero-number">01<span> / TEAM</span></div>
    </section>
    <section className="section wrap" id="training">
      <div className="section-heading"><div><p className="eyebrow dark">ПІДГОТОВКА</p><h2>Тренувальний процес<span>.</span></h2></div><p className="section-note">Системність сьогодні — результат завтра.</p></div>
      <div className="feature-grid">
        <article className="feature-card feature-main"><div className="card-top"><span className="card-icon">↗</span><span className="pill">НАСТУПНЕ ТРЕНУВАННЯ</span></div><h3>{nextTraining?.title || "Техніка та командна взаємодія"}</h3><p>{nextTraining?.focus || "Прийом, передача, подача та ігрові комбінації."}</p><div className="card-footer"><span>◷ {nextTraining ? formatDate(nextTraining.date) : "Розклад формується"}</span><span>{nextTraining?.duration || 90} хв</span></div></article>
        <article className="feature-card feature-dark"><div className="card-top"><span className="card-icon">✳</span><span className="pill">НАШ ПІДХІД</span></div><h3>Розумна підготовка</h3><p>Баланс фізичної форми, техніки, тактики й відновлення.</p><div className="mini-bars"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><div className="card-footer"><span>ПРОГРЕС КОМАНДИ</span><span>01—04</span></div></article>
      </div>
    </section>
    <section className="team-section" id="team"><div className="wrap"><div className="section-heading"><div><p className="eyebrow dark">ЄДИНА СИСТЕМА</p><h2>Кожен важливий<span>.</span></h2></div><p className="section-note">Ролі різні. Мета одна.</p></div>
      {players.data.length ? <div className="players-grid">{players.data.slice(0, 8).map(player => <article className="player-card" key={player.id}><div className="player-number">{String(player.number).padStart(2, "0")}</div><div><h3>{player.name}</h3><p>{player.position}</p></div><span className="player-status">{player.status === "active" ? "● У складі" : player.status}</span></article>)}</div> : <div className="empty-state"><span>06</span><div><h3>Команда починається з кожного</h3><p>Додайте склад у Backend API або керуйте контентом у Payload CMS.</p></div><a href={`${process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3001"}/admin`}>Відкрити CMS ↗</a></div>}
    </div></section>
    <section className="section wrap" id="matches"><div className="section-heading"><div><p className="eyebrow dark">КАЛЕНДАР</p><h2>Наступний виклик<span>.</span></h2></div><p className="section-note">Зосередженість. Характер. Командна гра.</p></div>
      <article className="match-card"><div className="match-date"><span>НАСТУПНИЙ МАТЧ</span><strong>{nextMatch ? formatDate(nextMatch.date) : "Скоро"}</strong></div><div className="match-versus"><div className="team-mark">VP</div><span>VS</span><div className="opponent-mark">{nextMatch?.opponent?.slice(0, 2).toUpperCase() || "OP"}</div></div><div className="match-info"><h3>{nextMatch?.opponent || "Суперник буде оголошений"}</h3><p>{nextMatch?.venue || "Календар змагань оновлюється"}</p></div><div className="match-arrow">↗</div></article>
    </section>
    <footer className="footer"><div className="wrap footer-inner"><Link className="brand" href="/">VOLLEY<span>PRO</span></Link><p>Створено командою. Керується даними.</p><a href={`${process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3001"}/admin`}>Керування контентом ↗</a></div></footer>
  </main>;
}
