import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';

export function AppFooter() {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M20 7h-3a2 2 0 0 0-2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 0-2-2H1" />
                <path d="M8 17a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2Z" />
              </svg>
              <span className="font-bold text-xl">JobMatch</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              AI-powered job matching platform connecting talented professionals with their ideal career opportunities.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition" aria-label="Github">
                <Github size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-2">
              <li><Link href="/jobs" className="text-muted-foreground hover:text-foreground text-sm transition">Browse Jobs</Link></li>
              <li><Link href="/dashboard" className="text-muted-foreground hover:text-foreground text-sm transition">AI Recommendations</Link></li>
              <li><Link href="/profile" className="text-muted-foreground hover:text-foreground text-sm transition">Profile Builder</Link></li>
              <li><Link href="" className="text-muted-foreground hover:text-foreground text-sm transition">Career Resources</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-foreground text-sm transition">Post a Job</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-foreground text-sm transition">Talent Search</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-foreground text-sm transition">Employer Resources</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-foreground text-sm transition">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-foreground text-sm transition">Our Story</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-foreground text-sm transition">Contact Us</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-foreground text-sm transition">Privacy Policy</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-foreground text-sm transition">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; 2025 JobMatch. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/" className="hover:text-foreground transition">Privacy</Link>
              <Link href="/" className="hover:text-foreground transition">Terms</Link>
              <Link href="/" className="hover:text-foreground transition">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}