"use client";

export default function Banner() {
  return (
    <div>
      <style jsx global>{`
        .banner {
          background: linear-gradient(74deg, #4285f4 0%, #9b72cb 40%, #d96570 100%);
          color: #fff;
        }
      `}</style>
      <div className="banner px-6 py-2 text-center text-white font-semibold text-sm">
        Read more about Google generative models at the{" "}
        <a
          href="https://ai.google.dev/showcase/fal"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          Google I/O 2025 blog post
        </a>
      </div>
    </div>
  );
}
