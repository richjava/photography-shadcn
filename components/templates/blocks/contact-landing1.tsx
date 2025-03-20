"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";

interface ContactLandingProps {
  content?: {
    data?: {
      backgroundImage: {
        url: string;
      };
      title: string;
      description: string;
      formTitle: string;
      phone: string;
      email: string;
      location: string;
      businessHours: string;
    };
  };
}

export default function ContactLanding1({ content }: ContactLandingProps) {
  const data = content?.data;
  if (!data) return null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contactLanding1">
      <div
        className="relative w-full h-48 overflow-hidden md:h-64"
        style={{
          backgroundImage: `url("${content?.data?.backgroundImage.url}")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <main className="min-h-screen bg-gray-50">
        <div className="px-8 py-24 mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h1 className="mb-8 text-5xl font-bold tracking-tight md:text-6xl">
                {data.title}
              </h1>
              <p className="mb-12 text-xl leading-relaxed text-gray-600">
                {data.description}
              </p>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 text-white bg-black rounded-full">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-xl font-semibold">Phone</h3>
                    <p className="text-gray-600">{data.phone}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 text-white bg-black rounded-full">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-xl font-semibold">Email</h3>
                    <p className="text-gray-600">{data.email}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 text-white bg-black rounded-full">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-xl font-semibold">Location</h3>
                    <p className="text-gray-600">{data.location}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 text-white bg-black rounded-full">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-xl font-semibold">Business Hours</h3>
                    <p className="text-gray-600">{data.businessHours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white shadow-lg rounded-2xl md:p-12">
              <h2 className="mb-8 text-3xl font-bold tracking-tight">
                {data.formTitle}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={formData["name" as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="w-full py-6 text-lg"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData["email" as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="w-full py-6 text-lg"
                    required
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Tell me about your project or event..."
                    value={formData["message" as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
                    }
                    className="w-full min-h-[200px] text-lg"
                    required
                  />
                </div>

                <Button type="submit" className="w-full py-6 text-lg">
                  Send Message
                  <Send className="w-5 h-5 ml-3" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
