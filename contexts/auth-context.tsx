"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if user is already logged in on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('auth_token');

        if (token) {
          const userInfo = JSON.parse(localStorage.getItem('user_info') || '{}');
          setUser(userInfo);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_info');
        localStorage.removeItem('recommended_jobs');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      localStorage.removeItem('recommended_jobs');
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signin`, {
        email,
        password
      },{
        withCredentials: true
      });

      if (!response) {
        throw new Error("Signup failed");
      }

      const data = response.data as { token: string, user: User };

      // Store auth info in localStorage
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user_info', JSON.stringify(data.user));
      setUser(data.user);

      toast("Login successful");

      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      toast("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`, {
        email,
        password,
        name
      },{
        withCredentials: true
      });

      if (!response) {
        throw new Error("Signup failed");
      }

      toast("Account created");

      router.push('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      toast("Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    localStorage.removeItem('recommended_jobs');

    setUser(null);
    toast("Logged out");
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}