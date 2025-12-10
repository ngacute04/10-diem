import { ArtistCard } from "./ArtistCard";

const artists = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1674485146230-d654464e477c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWl0YXIlMjBwbGF5ZXIlMjBjbG9zZXVwfGVufDF8fHx8MTc2NDQ2OTIwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    name: "Echo Trails",
    genre: "Dream Pop",
    location: "Portland, OR",
    description: "Ethereal soundscapes meet introspective lyrics in this solo project that's been making waves in the Pacific Northwest scene.",
    tracks: "12"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1761019363036-28188dffde69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcnVtbWVyJTIwcGVyZm9ybWluZyUyMGxpdmV8ZW58MXx8fHwxNzY0NDY5MjAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    name: "The Midnight Drivers",
    genre: "Post-Punk",
    location: "Brooklyn, NY",
    description: "Raw energy and angular guitars define this four-piece band that's reviving the spirit of early 80s underground music.",
    tracks: "8"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1758244241035-0d5c5b4ca798?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzeW50aCUyMGtleWJvYXJkJTIwbXVzaWNpYW58ZW58MXx8fHwxNzY0NDY5MjA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    name: "Synth Garden",
    genre: "Synth-Pop",
    location: "Austin, TX",
    description: "Vintage synthesizers and modern production create a nostalgic yet forward-thinking sound that's impossible to ignore.",
    tracks: "15"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1640836907763-1028cf0df896?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2lhbiUyMHN0dWRpbyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDQ1NzI3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    name: "Margot & The Satellites",
    genre: "Indie Folk",
    location: "Nashville, TN",
    description: "Intimate storytelling through acoustic arrangements and harmonies that feel like sitting around a campfire with old friends.",
    tracks: "10"
  }
];

export function ArtistSection() {
  return (
    <section id="artists" className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-neutral-900 mb-3">Artist Spotlights</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Discover the emerging artists pushing boundaries and creating the sound of tomorrow's underground
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} {...artist} />
          ))}
        </div>
      </div>
    </section>
  );
}
