import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_25%_at_50%_50%,var(--tw-gradient-stops))] from-primary/5 to-transparent opacity-60"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 text-sm font-medium">
            <span>AI-Powered Job Matching</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Find Your Perfect Career Match with{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              AI Intelligence
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
            Our AI analyzes your skills, experience, and preferences to recommend jobs that are truly right for you. 
            No more endless scrolling through irrelevant listings.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="px-8 gap-2 group">
              <Link href="/signup">
                Get started
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
          </div>
          
          <div className="mt-16 flex flex-col md:flex-row gap-6 justify-center items-center">
            <p className="text-sm text-muted-foreground">Trusted by companies worldwide</p>
            <div className="flex flex-wrap justify-center gap-8">
              {['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta'].map((company) => (
                <div key={company} className="text-muted-foreground/70 font-semibold">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}