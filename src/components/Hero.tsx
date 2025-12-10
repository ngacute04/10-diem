import { ImageWithFallback } from "./img/ImageWithFallback";
import { Badge } from "./page/badge";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-neutral-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1621276921502-c04982edd1ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMGJhbmQlMjBjb25jZXJ0fGVufDF8fHx8MTc2NDM4NjA1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Concert"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-3xl">
          <Badge variant="outline" className="mb-4 border-white/20 bg-white/10 text-white">
            Issue #47 — Winter 2025
          </Badge>
          <h2 className="mb-6 text-neutral-100">
            The New Wave of Bedroom Pop: How Lo-Fi Artists Are Redefining Indie Music
          </h2>
          <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
            From DIY home studios to streaming success, we explore the revolution of independent musicians 
            who are building global audiences without leaving their bedrooms.
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-900 hover:bg-neutral-100 transition-colors">
            Read the Feature
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
