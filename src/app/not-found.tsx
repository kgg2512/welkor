// Global not-found for non-localized paths. Wrapped by the root layout (html/body).
export default function GlobalNotFound() {
  return (
    <div className="py-24 text-center">
      <h1 className="text-3xl font-bold text-slate-900">404</h1>
      <p className="mt-2 text-slate-600">Page not found · 페이지를 찾을 수 없습니다.</p>
      <a href="/en" className="mt-6 inline-block text-brand underline">
        Go to WelKor
      </a>
    </div>
  );
}
