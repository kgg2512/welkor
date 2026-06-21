import { Link } from "@/i18n/navigation";

export default function LocaleNotFound() {
  return (
    <div className="py-24 text-center">
      <h1 className="text-3xl font-bold text-slate-900">404</h1>
      <p className="mt-2 text-slate-600">Page not found · 페이지를 찾을 수 없습니다.</p>
      <Link href="/" className="mt-6 inline-block text-brand underline">
        Home · 홈
      </Link>
    </div>
  );
}
