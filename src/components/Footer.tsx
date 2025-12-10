import { Music2, Instagram, Twitter, Youtube, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Music2 className="size-6" />
              <span className="tracking-tight">UNDERGROUND PULSE</span>
            </div>
            <p className="text-sm text-neutral-400">
              Celebrating independent music and the artists who make it.
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 text-neutral-100">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="text-neutral-400 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#artists" className="text-neutral-400 hover:text-white transition-colors">
                  Artist Spotlights
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-neutral-400 hover:text-white transition-colors">
                  Album Reviews
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Playlists
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-neutral-100">About</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Submit Music
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Write for Us
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-neutral-100">Follow Us</h4>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="size-9 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors rounded"
                aria-label="Instagram"
              >
                <Instagram className="size-4" />
              </a>
              <a 
                href="#" 
                className="size-9 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors rounded"
                aria-label="Twitter"
              >
                <Twitter className="size-4" />
              </a>
              <a 
                href="#" 
                className="size-9 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors rounded"
                aria-label="YouTube"
              >
                <Youtube className="size-4" />
              </a>
              <a 
                href="#" 
                className="size-9 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors rounded"
                aria-label="Facebook"
              >
                <Facebook className="size-4" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <p>&copy; 2025 Underground Pulse. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-neutral-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-neutral-300 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
