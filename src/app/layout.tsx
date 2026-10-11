import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "セコカンNavi | 施工管理技士のためのキャリア・働き方改善メディア",
  description: "施工管理の残業削減、キャリアアップ、転職、働き方改革をリアルな視点でサポートする情報メディア",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-emerald-700 transition-colors">
                セ
              </span>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                セコカンNavi
              </span>
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
              <Link href="/" className="hover:text-emerald-600 transition-colors">
                ホーム
              </Link>
            </nav>
          </div>
        </header>

        <div className="flex-1">
          {children}
        </div>

        <footer className="bg-slate-900 text-slate-400 py-10 mt-20 border-t border-slate-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center text-sm">
            <p className="font-semibold text-slate-200 text-base mb-2">セコカンNavi</p>
            <p className="text-slate-400 mb-6">施工管理技士の労働環境改善とキャリアシフトを応援するメディア</p>
            <p className="text-xs text-slate-500">© 2026 セコカンNavi. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
