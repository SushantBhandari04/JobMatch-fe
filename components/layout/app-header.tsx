"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppHeader() {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-200",
      isScrolled ? "bg-background/95 backdrop-blur-sm border-b" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
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
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/jobs" className="text-foreground/80 hover:text-foreground transition">
              Browse Jobs
            </Link>
            <Link href="/dashboard" className="text-foreground/80 hover:text-foreground transition">
              Dashboard
            </Link>
            
            <Link href="/profile/create" className="text-foreground/80 hover:text-foreground transition">
              Create profile
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center gap-4 ">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 cursor-pointer">
                    <User size={18} />
                    <span>{user.name || 'Account'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/signup">Sign up</Link>
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 mt-2 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link 
                href="/jobs" 
                className="px-2 py-2 hover:bg-muted rounded-md transition" 
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Jobs
              </Link>
              <Link 
                href="/about" 
                className="px-2 py-2 hover:bg-muted rounded-md transition"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="px-2 py-2 hover:bg-muted rounded-md transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {user ? (
                <>
                  <Link 
                    href="/dashboard"  
                    className="px-2 py-2 hover:bg-muted rounded-md transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/profile"  
                    className="px-2 py-2 hover:bg-muted rounded-md transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="px-2 py-2 text-left text-destructive hover:bg-destructive/10 rounded-md transition"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 mt-2">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>Log in</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/signup" onClick={() => setIsMenuOpen(false)}>Sign up</Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}