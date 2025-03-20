import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Camera, Calendar, MessageCircle, Heart, Image as ImageIcon, Clock, Palette } from 'lucide-react';

interface ProcessStep {
  icon: 'message' | 'calendar' | 'camera' | 'clock' | 'heart' | 'image' | 'palette';
  title: string;
  description: string;
}

interface ProcessPhase {
  title: string;
  steps: ProcessStep[];
}

interface ProcessProps {
  content?: {
    data?: {
      title: string;
      description: string;
      ctaText: string;
      ctaLink: string;
    };
    collections?: {
      phase?: ProcessPhase[];
    };
  };
}

const iconMap = {
  message: MessageCircle,
  calendar: Calendar,
  camera: Camera,
  clock: Clock,
  heart: Heart,
  image: ImageIcon,
  palette: Palette,
};

export default function Process1({ content }: ProcessProps) {
  const data = content?.data;
  if (!data) return null;
  const phases = content?.collections?.phase || [];

  return (
    <section id="process1" className="px-8 py-24 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
            {data.title}
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            {data.description}
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {phases.map((phase, phaseIndex) => (
            <div key={phaseIndex} className="space-y-8">
              <h3 className="text-2xl font-bold tracking-tight">
                {phase.title}
              </h3>
              <div className="space-y-6">
                {phase.steps.map((step, stepIndex) => {
                  const Icon = iconMap[step.icon];
                  return (
                    <div key={stepIndex} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-12 h-12 bg-black rounded-full">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold">{step.title}</h4>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href={data.ctaLink}>
            <Button className="px-8 py-6 text-lg">
              {data.ctaText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
} 