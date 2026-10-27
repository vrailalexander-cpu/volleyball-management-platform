import type { Metadata } from 'next'
import config from '@payload-config'
import { getPayload } from 'payload'

type PageProps = {
  params: Promise<{
    segments?: string[]
  }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { segments = [] } = await params

  return {
    title:
      segments.length > 0
        ? `${segments[segments.length - 1]} | Volleyball Team Manager`
        : 'Volleyball Team Manager',
    description:
      'Система управління тренувальним процесом та змаганнями волейбольної команди.',
  }
}

export default async function Page({ params }: PageProps) {
  const { segments = [] } = await params
  const slug = segments.at(-1) ?? 'home'

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 1,
  })

  const page = result.docs[0]

  const title =
    page && typeof page.title === 'string'
      ? page.title
      : 'Система управління волейбольною командою'

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="text-xl font-bold text-blue-700">
            Volleyball Team Manager
          </a>

          <nav className="flex flex-wrap gap-5 text-sm font-medium">
            <a href="/" className="hover:text-blue-700">
              Головна
            </a>
            <a href="/admin" className="hover:text-blue-700">
              Адміністрування
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 font-semibold uppercase tracking-wider text-blue-700">
            Управління волейбольною командою
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">
            {title}
          </h1>

          <p className="mb-8 text-lg leading-8 text-slate-600">
            Єдина система для організації тренувань, планування змагань,
            ведення складу команди та контролю спортивних результатів.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="http://localhost:3000/"
              className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              Відкрити публічну сторінку
            </a>

            <a
              href="/"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Головна сторінка
            </a>
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Гравці',
              description: 'Облік складу команди та спортивних позицій.',
            },
            {
              title: 'Тренування',
              description: 'Планування занять і тренувального навантаження.',
            },
            {
              title: 'Змагання',
              description: 'Календар матчів, турнірів і результатів.',
            },
            {
              title: 'Статистика',
              description: 'Контроль показників і спортивних досягнень.',
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="mb-3 text-xl font-bold text-blue-800">
                {item.title}
              </h2>

              <p className="leading-7 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6 text-sm text-slate-500">
          © {new Date().getFullYear()} Volleyball Team Manager
        </div>
      </footer>
    </main>
  )
}