import Link from "next/link";
import { Image, Video } from "lucide-react";

const HomePage = () => {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Media</h1>

        <p className="mt-1 text-base-content/60">
          Manage your images and videos in one place.
        </p>
      </div>

      {/* Media Library */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Images */}
        <Link
          href="/images"
          className="group rounded-box border border-base-300 bg-base-100 p-8 transition hover:border-primary hover:shadow-md"
        >
          <Image
            size={42}
            className="mb-5 text-primary transition-transform group-hover:scale-110"
          />

          <h2 className="text-2xl font-bold">Images</h2>

          <p className="mt-2 text-base-content/60">
            Manage, resize, compress and process your images.
          </p>

          <span className="mt-6 inline-block text-sm font-semibold text-primary">
            Open Image Library →
          </span>
        </Link>

        {/* Videos */}
        <Link
          href="/videos"
          className="group rounded-box border border-base-300 bg-base-100 p-8 transition hover:border-primary hover:shadow-md"
        >
          <Video
            size={42}
            className="mb-5 text-primary transition-transform group-hover:scale-110"
          />

          <h2 className="text-2xl font-bold">Videos</h2>

          <p className="mt-2 text-base-content/60">
            Manage, download and process your uploaded videos.
          </p>

          <span className="mt-6 inline-block text-sm font-semibold text-primary">
            Open Video Library →
          </span>
        </Link>
      </div>

      {/* Quick Upload */}
      <section>
        <h2 className="mb-4 text-xl font-bold">Quick Upload</h2>

        <div className="flex flex-wrap gap-3">
          <Link href="/social-share" className="btn btn-outline">
            <Image size={18} />
            Upload Image
          </Link>

          <Link href="/video-upload" className="btn btn-primary">
            <Video size={18} />
            Upload Video
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;