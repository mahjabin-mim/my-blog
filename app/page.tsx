import BlogCard from "@/components/BlogCard";
import { API_URL } from "@/lib/api";
import axios from "axios";

type Blog = {
  id: number;
  title: string;
  preview: string;
};

async function getBlogs(): Promise<Blog[]> {
  const res = await axios.get(`${API_URL}/blogs`);
  return res.data;
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