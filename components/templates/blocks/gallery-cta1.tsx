import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Photo {
  image?: {
    url: string;
    alt: string;
  }
}

interface Story {
  title: string;
  description: string;
  location: string;
  style: string;
  photos: Photo[];
}

interface GalleryCTAProps {
  content?: {
    collections?: {
      story?: Array<Story>;
    };
  };
}

export default function GalleryCTA({ content }: GalleryCTAProps) {
  const stories = content?.collections?.story || [
    {
      title: "Wedding Story 1",
      description: "Wedding Story 1 Description",
      location: "Wedding Location 1",
      style: "Wedding Style 1",
      photos: [
        {
          url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
          alt: "Wedding Image 1",
        },
        {
          url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
          alt: "Wedding Image 2",
        },
        {
          url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
          alt: "Wedding Image 3",
        },
        {
          url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
          alt: "Wedding Image 4",
        },
      ],
    },
  ];

  const firstStory = stories[0];
  const galleryPhotos = firstStory.photos.slice(1, 4);
  console.log('photos..', galleryPhotos)

  return (
    <section id="galleryCTA1" className="px-8 py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center grid-cols-1 gap-8 sm:grid-cols-2">
          {/* First column - Gallery Images */}
          <div className="space-y-8">
            {galleryPhotos.map((photo: Photo, index: number) => (
              <div key={index} className="overflow-hidden rounded-2xl">
                <Image
                  src={photo.image.url}
                  alt={photo.image.alt}
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>

          {/* Second column - Featured Story */}
          <div className="space-y-8">
            {/* Featured Story Image */}
            <div className="overflow-hidden rounded-2xl">
              <Image
                src={firstStory.photos[0].image.url}
                alt={firstStory.photos[0].image.alt}
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>

            {/* Wedding Story Card */}
            <div className="flex flex-col justify-between p-6 bg-black rounded-2xl sm:p-12">
              <div>
                <h3 className="mb-4 text-2xl font-bold text-white sm:text-3xl sm:mb-6">
                  {firstStory.title}
                </h3>
                <p className="mb-4 text-base leading-relaxed text-gray-300 sm:text-lg sm:mb-8">
                  {firstStory.description}
                </p>
                <div className="space-y-2 text-sm text-gray-300 sm:space-y-4 sm:text-base">
                  <p>Location: {firstStory.location}</p>
                  <p>Style: {firstStory.style}</p>
                </div>
              </div>
              <Link href="/contact" className="mt-6 sm:mt-8">
                <Button className="w-full py-4 text-base text-black bg-white sm:text-lg sm:py-6 hover:bg-gray-100">
                  Plan your wedding
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
