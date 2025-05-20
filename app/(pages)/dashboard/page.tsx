"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/auth-context';
import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import { Building, MapPin, Briefcase, Clock, Search, Sparkles } from 'lucide-react';
import { UserProfile } from '@/types/user';
import { toast } from 'sonner';
import axios from 'axios';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recommendedJobs, setRecommendedJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      router.push('/login');
      return;
    }

    // Load any previously generated recommendations
    const savedRecommendations = localStorage.getItem('recommended_jobs');
    if (savedRecommendations) {
      setRecommendedJobs(JSON.parse(savedRecommendations));
    }
  }, [user, router]);

  const getAIRecommendations = async () => {

    setIsLoading(true);
    

    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        toast("Token not found");
        return;
      }

      try{

        const userProfileResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`, {
          headers: {
            Authorization: token,
          },
        });
      }catch{
        toast("Profile not found");
        router.push('/profile/create');
        return;
      }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/job-matches`, {
        headers: {
          Authorization: token,
        },
      });

      const jobs = response.data; // assuming API returns top Jobs
      console.log('Recommended jobs:', jobs);
      if (!jobs ) {
        toast("No recommendations found");
        return;
      }
      // If jobs is an array, set directly; if it's an object with matches, use jobs.matches
      if (Array.isArray(jobs)) {
        setRecommendedJobs(jobs);
        localStorage.setItem('recommended_jobs', JSON.stringify(jobs));
      } else if (jobs && Array.isArray((jobs as any).matches)) {
        setRecommendedJobs((jobs as any).matches);
        localStorage.setItem('recommended_jobs', JSON.stringify((jobs as any).matches));
      } else {
        setRecommendedJobs([]);
        localStorage.setItem('recommended_jobs', JSON.stringify([]));
      }

      toast("Recommendations ready");
    } catch (error) {
      console.error('Getting recommendations failed:', error);
      toast("Recommendation error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome, {user.name || 'there'}!
            </h1>
            <p className="text-muted-foreground">
              Your personalized job dashboard
            </p>
          </div>

          <Tabs defaultValue="recommendations" className="space-y-8">
            <TabsList>
              <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
              <TabsTrigger value="jobs">Browse Jobs</TabsTrigger>
            </TabsList>

            <TabsContent value="recommendations" className="space-y-8">
              <div className="bg-primary/5 border rounded-lg p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      AI-Powered Job Recommendations
                    </h2>
                    <p className="text-muted-foreground max-w-2xl">
                      Our AI analyzes your profile to find jobs that match your skills, experience,
                      and preferences.
                    </p>
                  </div>
                  <Button
                    onClick={getAIRecommendations}
                    className="shrink-0 cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? "Finding matches..." : recommendedJobs.length > 0
                      ? "Refresh Recommendations"
                      : "Find My Matches"}
                  </Button>
                </div>
              </div>

              {recommendedJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendedJobs.map((job) => (
                    <Card key={job.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">{job.title}</CardTitle>
                            <CardDescription className="flex items-center gap-1 mt-1">
                              <Building className="h-4 w-4" />
                              {job.company}
                            </CardDescription>
                          </div>
                          <Badge variant={job.remote ? "default" : "outline"}>
                            {job.remote ? "Remote" : job.hybrid ? "Hybrid" : "On-site"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Briefcase className="h-4 w-4" />
                            <span>{job.experience}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{job.type}</span>
                          </div>

                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">
                               Skills ({job.skills.length})
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {job.skills.map((skill: string) => (
                                <Badge key={skill} variant="secondary">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                          <div>View Job</div>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No recommendations yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    Click the &quot;Find My Matches&quot; button to get AI-powered job recommendations based on your profile.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="jobs">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Browse All Jobs</h2>
                <Button variant="outline" asChild>
                  <Link href="/jobs">
                    <Search className="h-4 w-4 mr-2" />
                    Advanced Search
                  </Link>
                </Button>
              </div>

              <div className="mt-8 text-center">
                <Button asChild>
                  <Link href="/jobs">View All Jobs</Link>
                </Button>
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}