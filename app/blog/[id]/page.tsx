import { API_URL } from "@/lib/api";
import { notFound } from "next/navigation";

type Blog = {
  id: number;
  title: string;
  content: string;
};

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getBlog(id: string): Promise<Blog | null> {
  const res = await fetch(`${API_URL}/blogs/${id}`, {
    next: { revalidate: 10 }, //isr
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch(`${API_URL}/blogs`);

  if (!res.ok) {
    return [];
  }

  const blogs: Blog[] = await res.json();

  return blogs.map((blog) => ({
    id: blog.id.toString(),
  }));
}

export default async function BlogPage({ params }: PageProps) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
}