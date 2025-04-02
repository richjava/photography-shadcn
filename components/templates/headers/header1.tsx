"use client";

import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Logo from "@/components/shared/Logo";

interface HeaderProps {
  data?: {
    title?: string;
  };
  global?: {
    name?: string;
    logo?: {
      url: string;
      width: number;
      height: number;
    };
  };
  collections?: {
    primaryMenuItem?: Array<{
      label: string;
      url: string;
    }>;
  };
}

export default function Header({ content }: { content?: HeaderProps }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };
  const menuItems = content?.collections?.primaryMenuItem || [];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="relative z-50 px-4 py-4 sm:px-8 sm:py-6 bg-black/90 backdrop-blur-sm">
        <nav className="flex items-center justify-between mx-auto max-w-7xl">
          <Link
            href="/"
            className={cn(
              "flex items-center space-x-3 transition-colors",
              isActive("/") ? "text-white" : "text-gray-400 hover:text-white"
            )}
          >
            <Logo />
            <span className="text-xl font-medium tracking-tight">
              Jane Doe Photography
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="items-center hidden space-x-12 md:flex">
            {menuItems.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                className={cn(
                  "transition-colors text-lg tracking-tight",
                  isActive(item.url)
                    ? "text-white font-medium"
                    : "text-gray-400 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact">
              <Button
                variant="outline"
                className={cn(
                  "transition-colors text-lg px-8 py-6",
                  isActive("/contact")
                    ? "bg-white text-black hover:bg-gray-100"
                    : "bg-transparent text-white border-white hover:bg-white hover:text-black"
                )}
              >
                Contact Me
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="p-2 text-white md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black transform transition-transform duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
          {menuItems.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className={cn(
                "text-2xl tracking-tight transition-colors",
                isActive(item.url)
                  ? "text-white font-medium"
                  : "text-gray-400 hover:text-white"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
            <Button
              variant="outline"
              className={cn(
                "text-xl px-8 py-6 mt-4",
                isActive("/contact")
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-transparent text-white border-white hover:bg-white hover:text-black"
              )}
            >
              Contact Me
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
