import { ImageWithFallback } from "./img/ImageWithFallback";
import { Badge } from "./page/badge";
import { Music, MapPin } from "lucide-react";

interface ArtistCardProps {
  image: string;
  name: string;
  genre: string;
  location: string;
  description: string;
  tracks: string;
}

export function ArtistCard({ image, name, genre, location, description, tracks }: ArtistCardProps) {
  return (
    <div className="group bg-neutral-50 hover:bg-white transition-colors border border-neutral-200">
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-neutral-900 mb-1">{name}</h3>
            <Badge variant="secondary" className="text-xs">
              {genre}
            </Badge>
          </div>
          <Music className="size-5 text-neutral-400" />
        </div>
        
        <div className="flex items-center gap-1 text-sm text-neutral-500 mb-4">
          <MapPin className="size-3" />
          {location}
        </div>
        
        <p className="text-sm text-neutral-600 mb-4 line-clamp-3">
          {description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
          <span className="text-xs text-neutral-500">{tracks} tracks</span>
          <button className="text-sm text-neutral-900 hover:underline">
            Listen →
          </button>
        </div>
      </div>
    </div>
  );
}
