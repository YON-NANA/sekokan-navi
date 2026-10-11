import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostData {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  isPublished: boolean;
  content: string;
}

export function getAllPosts(): PostData[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug: data.slug || slug,
        title: data.title || "",
        description: data.description || "",
        category: data.category || "未分類",
        date: data.date || "",
        isPublished: data.isPublished ?? true,
        content,
      } as PostData;
    })
    .filter((post) => post.isPublished)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return allPostsData;
}

export function getPostBySlug(slug: string): PostData | null {
  if (!fs.existsSync(postsDirectory)) {
    return null;
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const targetFile = fileNames.find((file) => {
    if (!file.endsWith(".md")) return false;
    if (file.replace(/\.md$/, "") === slug) return true;
    const fullPath = path.join(postsDirectory, file);
    const { data } = matter(fs.readFileSync(fullPath, "utf8"));
    return data.slug === slug;
  });

  if (!targetFile) {
    return null;
  }

  const fullPath = path.join(postsDirectory, targetFile);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: data.slug || targetFile.replace(/\.md$/, ""),
    title: data.title || "",
    description: data.description || "",
    category: data.category || "未分類",
    date: data.date || "",
    isPublished: data.isPublished ?? true,
    content,
  };
}
