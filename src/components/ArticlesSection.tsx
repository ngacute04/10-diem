import { ArticleCard } from "./ArticleCard";

const articles = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1629426958038-a4cb6e3830a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZHMlMjBtdXNpY3xlbnwxfHx8fDE3NjQ0MDEzMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "REVIEW",
    title: "The Return of Vinyl: Why Physical Media Matters More Than Ever",
    excerpt: "In an age of streaming, independent artists are finding new life in pressing their own records. We examine the vinyl revival and what it means for indie music.",
    readTime: "6 min",
    author: "Jordan Martinez",
    date: "Nov 28, 2025"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1677947226901-5164b32d5cfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5nZXIlMjBtaWNyb3Bob25lJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzY0Mzg3NDI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "INTERVIEW",
    title: "Luna Waves on Authenticity and Building a Fanbase from Scratch",
    excerpt: "The Brooklyn-based singer-songwriter talks about her journey from open mic nights to selling out venues, all while maintaining creative control.",
    readTime: "8 min",
    author: "Sam Chen",
    date: "Nov 25, 2025"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1640836907763-1028cf0df896?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2lhbiUyMHN0dWRpbyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDQ1NzI3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "FEATURE",
    title: "Inside the DIY Studio: Essential Gear for Home Recording on a Budget",
    excerpt: "You don't need expensive equipment to make professional-sounding music. Our guide to building your home studio without breaking the bank.",
    readTime: "10 min",
    author: "Alex Rivera",
    date: "Nov 22, 2025"
  }
];

export function ArticlesSection() {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-neutral-900 mb-2">Latest Features</h2>
            <p className="text-neutral-600">
              In-depth stories, reviews, and commentary from the indie music scene
            </p>
          </div>
          <button className="text-sm text-neutral-900 hover:underline hidden md:block">
            View All Articles →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
}
