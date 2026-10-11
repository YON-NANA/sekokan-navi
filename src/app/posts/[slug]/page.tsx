import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "記事が見つかりません | セコカンNavi",
    };
  }

  return {
    title: `${post.title} | セコカンNavi`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* 戻るリンク */}
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm font-medium text-slate-500 hover:text-emerald-600 inline-flex items-center gap-1 transition-colors"
        >
          ← 記事一覧に戻る
        </Link>
      </div>

      {/* 記事ヘッダー */}
      <header className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
            {post.category}
          </span>
          <time className="text-sm text-slate-500 font-medium">
            公開日: {post.date}
          </time>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
          {post.title}
        </h1>

        <p className="text-slate-600 bg-slate-50 border-l-4 border-emerald-500 p-4 rounded-r-lg text-sm sm:text-base leading-relaxed">
          {post.description}
        </p>
      </header>

      {/* 記事本文 */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-12 shadow-sm">
        <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-h2:text-2xl prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-3 prose-h2:mt-10 prose-h3:text-xl prose-h3:mt-8 prose-p:leading-relaxed prose-p:text-slate-700 prose-li:text-slate-700 prose-strong:text-slate-900 prose-strong:font-bold prose-table:my-6 prose-th:bg-slate-100 prose-th:p-3 prose-td:p-3 prose-th:border prose-th:border-slate-200 prose-td:border prose-td:border-slate-200">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
      </div>

      {/* フッターナビゲーション */}
      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-colors"
        >
          ← 記事一覧へ戻る
        </Link>
      </div>
    </article>
  );
}
