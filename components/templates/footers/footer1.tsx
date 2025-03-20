import { Camera, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="flex items-center space-x-3">
            {/* <Camera className="h-10 w-10" /> */}
            <span className="flex rounded-full w-10 h-10 text-black bg-white items-center text-4xl font-extrabold tracking-tight justify-center">JD</span>
            <span className="text-3xl font-medium tracking-tight">Jane Doe Photography</span>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              <Instagram className="h-8 w-8" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              <Facebook className="h-8 w-8" />
            </a>
          </div>
          <p className="text-base text-gray-400 tracking-wide">
            © {new Date().getFullYear()} Jane Doe Photography. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}