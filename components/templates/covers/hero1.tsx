import Image from 'next/image';

interface HeroProps {
  content?: {
    data?: {
      title: string;
      subtitle: string;
      backgroundImage: {
        url: string;
        alt: string;
      };
    };
  };
}

export default function Hero({ content }: HeroProps) {
  const title = content?.data?.title || 'Jane Doe'
  const subtitle = content?.data?.subtitle || 'Professional Photographer'
  const backgroundImage= content?.data?.backgroundImage || {url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4', alt: 'Jane Doe'};

  return (
    <section id="hero" className="relative w-full h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage.url}
          alt={backgroundImage.alt}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
        <div className="max-w-4xl px-4">
        <p className="text-2xl mb-6 font-light tracking-widest uppercase opacity-0 animate-[fadeIn_0.5s_ease-out_0.5s_forwards]">{subtitle}</p>
            <h1 className="text-7xl md:text-8xl xl:text-9xl font-bold tracking-tighter opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
            {title}
            </h1>
        </div>
      </div>
    </section>
  );
} 