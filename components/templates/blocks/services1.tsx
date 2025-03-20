import Image from "next/image";
import Link from "next/link";

interface ServicesProps {
  content?: {
    data?: {
      title: string;
      description: string;
      image: {
        url: string;
        alt: string;
      };
    };
    collections?: {
      service?: Array<{
        title: string;
        description: string;
        image: {
          url: string;
          alt: string;
        };
        cta: {
          label: string;
          url: string;
        };
      }>;
    };
  };
  
}

export default function Services({content}: ServicesProps) {
  const title = content?.data?.title || 'Services';
  const description = content?.data?.description || 'We offer a range of services to suit your needs.';
  const services = content?.collections?.service || [
    {
      title: 'Weddings',
      description: 'From intimate ceremonies to grand celebrations, I\'ll be there to document every precious moment of your special day.',
      image: {
        url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4',
        alt: 'Portrait'
      },
      cta: {
        label: 'Plan Your Wedding',
        url: '/contact'
      }
    },
    {
      title: 'Portraits',
      description: 'Professional headshots, family portraits, or creative personal sessions - let\'s create images that reflect your authentic self.',
      image: {
        url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4',
        alt: 'Portrait'
      },
      cta: {
        label: 'Book a Session',
        url: '/contact'
      }
    }
  ];
  return (
    <section id="services1" className="py-20 bg-gray-50">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">{title}</h2>
          <p className="text-xl text-gray-600">{description}</p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={index}
              className="overflow-hidden transition bg-white rounded-lg shadow-lg group hover:shadow-xl"
            >
              {/* Service Image */}
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={service.image.url}
                  alt={service.image.alt}
                  fill
                  className="object-cover transition group-hover:scale-105"
                />
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h3 className="mb-3 text-2xl font-bold">{service.title}</h3>
                <p className="mb-6 text-gray-600">{service.description}</p>
                <Link
                  href={service.cta.url}
                  className="inline-block px-6 py-3 text-white transition bg-gray-900 rounded-md hover:bg-gray-800"
                >
                  {service.cta.label}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
