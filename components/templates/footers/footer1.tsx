import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 text-white bg-black">
      <div className="px-8 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="flex items-center space-x-3">
            {/* <Camera className="w-10 h-10" /> */}
            <span className="flex items-center justify-center w-10 h-10 text-4xl font-extrabold tracking-tight text-black bg-white rounded-full">JD</span>
            <span className="text-3xl font-medium tracking-tight">Jane Doe Photography</span>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gray-300"
            >
              <Instagram className="w-8 h-8" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gray-300"
            >
              <Facebook className="w-8 h-8" />
            </a>
          </div>
          <p className="text-base tracking-wide text-gray-400">
            © {new Date().getFullYear()} Jane Doe Photography. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}