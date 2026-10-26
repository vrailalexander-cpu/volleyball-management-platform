import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
        Помилка 404
      </p>

      <h1 className="mt-4 text-4xl font-bold text-slate-900">
        Сторінку не знайдено
      </h1>

      <p className="mt-4 max-w-md text-slate-600">
        Можливо, сторінку переміщено або адресу введено неправильно.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        На головну
      </Link>
    </main>
  )
}