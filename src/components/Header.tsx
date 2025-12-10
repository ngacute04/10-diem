import { Music2, Search } from "lucide-react";
import { Button } from "./page/button";

export function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Music2 className="size-8 text-neutral-900" />
            <div>
              <h1 className="tracking-tight text-neutral-900">UNDERGROUND PULSE</h1>
              <p className="text-xs text-neutral-500">Independent Music Quarterly</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
              Features
            </a>
            <a href="#artists" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
              Artists
            </a>
            <a href="#reviews" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
              Reviews
            </a>
            <a href="#subscribe" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
              Subscribe
            </a>
            <Button size="sm" variant="ghost">
              <Search className="size-4" />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
