import { useState, useEffect } from 'react';

interface BannerProps {
  content?: {
    data?: {
      title: string;
      subtitle: string;
      description: string;
      backgroundImage: {
        url: string;
        alt: string;
      };
    };
  };
}

export default function Banner1({ content }: BannerProps) {
  const data = content?.data;
  const title = data?.title || 'Capture Your Story';
  const description = data?.description || 'Whether you\'re planning your dream wedding or looking to create stunning portraits, I\'m here to help you preserve these precious moments.';
  const [isVisible, setIsVisible] = useState(false);
  if (!data) return null;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="banner1" className="relative px-8 py-24 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className={`text-5xl md:text-6xl font-bold tracking-tight mb-8 opacity-0 transform translate-y-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : ''
            }`}>
              {title}
            </h1>
            <p className={`text-xl text-gray-600 leading-relaxed opacity-0 transform translate-y-4 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : ''
            }`}>
              {description}
            </p>
          </div>
        </div>
      </section>
  );
} 