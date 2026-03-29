import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container">
      <Image
        src="/globe.svg"
        alt="Profile Picture"
        width={200}
        height={200}
        className="profileImage"
      />

      <h1 className="title">About Me</h1>

      <p className="description">
        Hello! I am Mahjabin Mim. <br />
        I am a CSE student and I love web development.
      </p>
    </div>
  );
}