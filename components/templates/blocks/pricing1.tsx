"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

interface PricingPackage {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
}

interface PricingProps {
  content?: {
    data?: {
      title: string;
      description: string;
    };
    collections?: {
      pricingPackage?: PricingPackage[];
    };
  };
}

export default function Pricing1({ content }: PricingProps) {
  const data = content?.data;
  const extractPrice = (price: string) => {
    const numericValue = price.replace(/[^0-9.]/g, ""); // Keep only numbers & decimals
    return parseFloat(numericValue) || 0; // Default to 0 if parsing fails
  };
  
  const packages = (content?.collections?.pricingPackage || [])
    .sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
    
  if (!data || packages.length === 0) return null;

  return (
    <section id="pricing1" className="px-8 py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
            {data.title}
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            {data.description}
          </p>
        </div>

        <div className="flex justify-center">
          <div className={`grid gap-8 ${
            packages.length === 1 ? 'md:w-1/3' :
            packages.length === 2 ? 'md:w-2/3' :
            packages.length === 3 ? 'md:w-[90%] lg:w-[85%]' :
            'w-full'
          } ${
            packages.length === 1 ? 'grid-cols-1' :
            packages.length === 2 ? 'md:grid-cols-2' :
            'md:grid-cols-3'
          }`}>
            {packages.map((pkg, index) => (
              <div 
                key={index}
                className={`${
                  pkg.isPopular ? 'bg-black text-white' : 'bg-white'
                } rounded-2xl p-8 shadow-lg relative flex flex-col`}
              >
                {pkg.isPopular && (
                  <div className="absolute px-4 py-1 text-sm text-white -translate-x-1/2 bg-black rounded-full -top-4 left-1/2">
                    Most Popular
                  </div>
                )}
                <div>
                  <h3 className="mb-4 text-2xl font-bold">{pkg.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{pkg.price}</span>
                  </div>
                  <ul className="space-y-4">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Check className={`h-5 w-5 ${pkg.isPopular ? 'text-white' : 'text-black'}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-8 mt-auto">
                  <Link href="/contact">
                    <Button 
                      variant={pkg.isPopular ? 'default' : 'outline'}
                      className={`w-full text-lg py-6 hover:bg-gray-100 ${
                        pkg.isPopular ? 'bg-white text-black' : ''
                      }`}
                    >
                      {pkg.buttonText || `Book ${pkg.name}`}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
