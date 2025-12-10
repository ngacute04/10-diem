import { ImageWithFallback } from "./img/ImageWithFallback";
import { Badge } from "./page/badge";
import { Clock } from "lucide-react";

interface ArticleCardProps {
  image: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  author: string;
  date: string;
}

export function ArticleCard({ image, category, title, excerpt, readTime, author, date }: ArticleCardProps) {
  return (
    <article className="group cursor-pointer">
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 mb-4">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-white text-neutral-900 hover:bg-white">
            {category}
          </Badge>
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-neutral-900 group-hover:text-neutral-600 transition-colors">
          {title}
        </h3>
        <p className="text-neutral-600 line-clamp-2">
          {excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-neutral-500 pt-2">
          <div>
            By <span className="text-neutral-700">{author}</span> • {date}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="size-3" />
            {readTime}
          </div>
        </div>
      </div>
    </article>
  );
}
