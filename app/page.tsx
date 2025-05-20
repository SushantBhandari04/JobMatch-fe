import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import { HeroSection } from '@/components/marketing/hero-section';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-grow">
        <HeroSection/>
        <section className="bg-primary/5 py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to find your dream job?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of professionals who have already found their perfect career match with our 
              AI-powered platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="px-8">
                <Link href="/signup">Get started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-8">
                <Link href="/jobs">Browse jobs</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}