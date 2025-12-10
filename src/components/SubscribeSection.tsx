import { useState } from "react";
import { Input } from "./page/input";
import { Button } from "./page/button";
import { Checkbox } from "./page/checkbox";
import { Mail, Check } from "lucide-react";

export function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && acceptTerms) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setAcceptTerms(false);
        setIsSubscribed(false);
      }, 5000);
    }
  };

  return (
    <section id="subscribe" className="py-20 bg-neutral-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {!isSubscribed ? (
            <>
              <div className="inline-flex items-center justify-center size-16 bg-white/10 rounded-full mb-6">
                <Mail className="size-8" />
              </div>
              
              <h2 className="text-white mb-4">Never Miss an Issue</h2>
              <p className="text-neutral-300 mb-8">
                Get exclusive interviews, early access to new features, and curated playlists delivered 
                straight to your inbox. Join 1k+ indie music lovers.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-neutral-400 focus:border-white"
                    required
                  />
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="bg-white text-neutral-900 hover:bg-neutral-100"
                    disabled={!acceptTerms}
                  >
                    Subscribe
                  </Button>
                </div>
                
                <div className="flex items-start gap-2 text-left">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    className="mt-0.5 border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-neutral-900"
                  />
                  <label htmlFor="terms" className="text-sm text-neutral-400 cursor-pointer">
                    I agree to receive the quarterly newsletter and occasional updates. 
                    You can unsubscribe at any time.
                  </label>
                </div>
              </form>
              
              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-neutral-500">
                <span>✓ No spam, ever</span>
                <span>✓ Unsubscribe anytime</span>
                <span>✓ Quarterly delivery</span>
              </div>
            </>
          ) : (
            <div className="py-8">
              <div className="inline-flex items-center justify-center size-16 bg-green-500/20 rounded-full mb-6">
                <Check className="size-8 text-green-400" />
              </div>
              <h2 className="text-white mb-4">Welcome to the Community!</h2>
              <p className="text-neutral-300">
                Thanks for subscribing! Check your inbox for a confirmation email and get ready 
                for your first issue of Underground Pulse.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
