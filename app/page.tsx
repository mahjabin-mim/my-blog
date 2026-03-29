import BlogCard from "@/components/BlogCard";
import { API_URL } from "@/lib/api";

type Blog = {
  id: number;
  title: string;
  preview: string;
};

async function getBlogs(): Promise<Blog[]> {
  const res = await fetch(`${API_URL}/blogs`, {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
}

export default async function HomePage() {
  const blogs = await getBlogs();

  return (
    <div className="container">
      <div className="grid">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            preview={blog.preview}
          />
        ))}
      </div>
    </div>
  );
}