import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ButtonLink {
  label: string;
  url: string;
  type: string;
}

interface AboutProps {
  content?: {
    data?: {
      name: string;
      image: {
        url: string;
        alt: string;
      };
      quote: string;
      bio: string[];
      buttonLinks: ButtonLink[];
    };
  };
}

export default function About({ content }: AboutProps) {
  const name = content?.data?.name || "Jane Doe";
  const image = content?.data?.image || {
    url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
    alt: "Jane Doe",
  };
  const quote =
    content?.data?.quote ||
    "Photography is not just about capturing moments; it's about preserving feelings, emotions, and stories that deserve to be remembered.";
  const bio = content?.data?.bio || [
    "I am a professional photographer with a passion for capturing life's beautiful moments.",
  ];
  const buttonLinks = content?.data?.buttonLinks || [];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    const target = document.getElementById("about1");
    if (target) observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about1" className="px-8 py-32 bg-white">
      <div
        className={`max-w-7xl mx-auto transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80"
                alt="Jane Doe Portrait"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute max-w-sm p-8 text-white bg-black -bottom-8 -right-8 rounded-2xl">
              <p className="text-lg italic">{quote}</p>
            </div>
          </div>
          <div>
            <h2 className="mb-8 text-5xl font-bold tracking-tight">
              Hello, I'm {name}
            </h2>
            <div className="space-y-6 text-xl leading-relaxed text-gray-600">
              {bio.map((paragraph, index) => (
                <p key={index} className="text-gray-600">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex gap-6 mt-12">
              {buttonLinks.map((button) => (
                <Link key={button.url} href={button.url}>
                  <Button
                    variant={
                      button.type === "secondary" ? "outline" : "default"
                    }
                    className="px-8 py-6 text-lg"
                  >
                    {button.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
