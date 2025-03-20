"use client";

import { ImageViewer } from "@/components/shared/image-viewer";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tag } from "lucide-react";
import { useState } from "react";

interface Photo {
  id: string;
  title: string;
  description: string;
  image: {
    url: string;
    alt: string;
  };
  category: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  coverPhoto: {
    image: {
      url: string;
      alt: string;
    }
  };
  photos: Photo[];
}

interface PricingProps {
  content?: {
    collections?: {
      project?: Project[];
    };
  };
}

export default function Projects({ content }: PricingProps) {
  const projects = content?.collections?.project || [];
  if (projects.length === 0) return null;
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);

  const handleImageClick = (photo: Photo, index: number) => {
    setSelectedImage(photo);
  };

  return (
    <section id="projects">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="bg-white border-r w-96">
          <ScrollArea className="h-[calc(100vh-72px)]">
            <div className="p-6 space-y-4">
              {projects.map((project) => (
                <Card
                  key={project._id}
                  className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedProject._id === project._id ? "border-black" : ""
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="mb-4 overflow-hidden rounded-lg aspect-video">
                    <img
                      src={project.coverPhoto?.image?.url}
                      alt={project.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">
                    {project.title}
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      <span>{project.category}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-50">
          <ScrollArea className="h-[calc(100vh-72px)]">
            <div className="max-w-5xl p-8 pt-20 mx-auto">
              <div className="mb-8">
                <h1 className="mb-4 text-4xl font-bold">
                  {selectedProject.title}
                </h1>
                <p className="text-xl text-gray-600">
                  {selectedProject.description}
                </p>
              </div>
              <div className="gap-4 space-y-4 columns-1 md:columns-2 lg:columns-3">
                {selectedProject.photos.map((photo, index) => (
                  <div
                    key={index}
                    className="cursor-pointer break-inside-avoid"
                    onClick={() => handleImageClick(photo, index)}
                  >
                    <div className="relative overflow-hidden rounded-lg group">
                      <img
                        src={photo.image?.url}
                        alt={`${selectedProject.title} ${index + 1}`}
                        className="w-full h-auto transition-transform duration-300 transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-black/60 group-hover:opacity-100">
                        <div className="p-6 text-center text-white">
                          <h3 className="mb-2 text-xl font-medium tracking-tight">
                            {selectedProject.title}
                          </h3>
                          <p className="text-sm tracking-wide text-gray-300">
                            {selectedProject.category}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      <ImageViewer
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  );
}
