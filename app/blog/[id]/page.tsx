import { API_URL } from "@/lib/api";
import { notFound } from "next/navigation";
import axios from "axios";

type Blog = {
  id: number;
  title: string;
  content: string;
};

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getBlog(id: string): Promise<Blog | null> {
  const res = await axios.get(`${API_URL}/blogs/${id}`);
  return res.data;
}

export async function generateStaticParams() {
  const res = await axios.get(`${API_URL}/blogs`);
  const blogs: Blog[] = res.data;

  return blogs.slice(0, 3).map((blog) => ({
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