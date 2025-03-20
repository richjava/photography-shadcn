import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

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

interface ImageViewerProps {
  image: Photo | null;
  onClose: () => void;
}

export function ImageViewer({ image, onClose }: ImageViewerProps) {
  if (!image) return null;

  return (
    <Dialog open={!!image} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 border-none bg-black/95">
        <button
          onClick={onClose}
          className="absolute z-50 p-2 text-white transition-colors rounded-full right-4 top-4 bg-black/50 hover:bg-black/75"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="relative w-full h-full min-h-[80vh] flex items-center justify-center">
          <img
            src={image.image.url}
            alt={image.title}
            className="max-w-full max-h-[85vh] object-contain"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-black/75 backdrop-blur-sm">
            <h3 className="mb-2 text-2xl font-medium tracking-tight">{image.title}</h3>
            <div className="flex items-center justify-between text-base text-gray-300">
              <span className="tracking-wide">{image.category}</span>
              {/* <span>{format(new Date(image.date), 'MMMM d, yyyy')}</span> */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}