import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-br from-emerald-800 to-slate-900 rounded-2xl p-8 sm:p-12 text-white shadow-xl mb-12">
        <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-400/30 mb-4">
          施工管理のリアルな労働環境改善ガイド
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
          現場の過酷な残業・激務から、<br className="hidden sm:inline" />
          自由と健康を取り戻す現実的な選択肢。
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
          「セコカンNavi」は、月80時間を超える長時間労働や休日の少なさに悩む現場監督へ向けて、
          労働環境改善の具体策やキャリアシフトのノウハウをお届けします。
        </p>
      </section>

      {/* 記事一覧ヘッダー */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
          <span className="w-2.5 h-6 bg-emerald-600 rounded-full inline-block"></span>
          新着記事一覧
        </h2>
        <span className="text-xs sm:text-sm text-slate-500 font-medium">
          全 {posts.length} 件
        </span>
      </div>

      {/* 記事カード一覧 */}
      {posts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200 text-slate-500">
          記事が見つかりませんでした。
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                    {post.category}
                  </span>
                  <time className="text-xs text-slate-400 font-medium">
                    {post.date}
                  </time>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug mb-3">
                  <Link href={`/posts/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-6">
                  {post.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-sm font-semibold text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1"
                >
                  記事を読む
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
