"use client";

import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import { Building, MapPin, Briefcase, Clock, Filter, Search, X } from 'lucide-react';
import axios from 'axios';
import JobCard from '@/components/ui/job-card';
import { jobType } from '@/lib/utils';


export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobsData, setJobsData] = useState<jobType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState({
    jobType: '',
    experienceLevel: '',
    remoteOnly: false,
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs`);

      const jobs = response.data;

      setJobsData(jobs as jobType[]);
      setLoading(false);
    }
    fetchJobs()
  }, [])

  // Apply filters and search
  const filteredJobs = jobsData.filter(job => {
    // Search term filter
    if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !job.company.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }

    // Job type filter
    if (filters.jobType !== "all" && filters.jobType && job.type !== filters.jobType) {
      return false;
    }

    // Experience level filter
    if (filters.experienceLevel !== "all" && filters.experienceLevel && job.experience !== filters.experienceLevel) {
      return false;
    }

    // Remote filter
    if (filters.remoteOnly && !job.remote) {
      return false;
    }

    return true;
  });

  const resetFilters = () => {
    setFilters({
      jobType: '',
      experienceLevel: '',
      remoteOnly: false,
    });
  };

  const hasActiveFilters = filters.jobType || filters.experienceLevel || filters.remoteOnly;

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Find Your Next Opportunity</h1>
            <p className="text-muted-foreground">
              Browse through our curated list of jobs from top companies
            </p>
          </div>

          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search jobs, companies, or skills"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button
                variant="outline"
                className="gap-2 cursor-pointer"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                Filters
                {hasActiveFilters && <Badge variant="secondary" className="ml-1">Active</Badge>}
              </Button>
            </div>

            {showFilters && (
              <div className="p-4 border rounded-lg bg-background">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-grow space-y-2">
                    <label className="text-sm font-medium">Job Type</label>
                    <Select
                      value={filters.jobType}
                      onValueChange={(value) => setFilters({ ...filters, jobType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All job types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All job types</SelectItem>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-grow space-y-2">
                    <label className="text-sm font-medium">Experience Level</label>
                    <Select
                      value={filters.experienceLevel}
                      onValueChange={(value) => setFilters({ ...filters, experienceLevel: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All levels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All levels</SelectItem>
                        <SelectItem value="Entry level">Entry level</SelectItem>
                        <SelectItem value="Mid level">Mid level</SelectItem>
                        <SelectItem value="Senior">Senior</SelectItem>
                        <SelectItem value="Lead">Lead</SelectItem>
                        <SelectItem value="Executive">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-grow space-y-2">
                    <div className="h-7"></div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remote"
                        checked={filters.remoteOnly}
                        onCheckedChange={(checked) => setFilters({ ...filters, remoteOnly: checked === true })}
                      />
                      <label
                        htmlFor="remote"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remote only
                      </label>
                    </div>
                  </div>

                  <div className="flex-grow ">
                    <div className="h-7"></div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="gap-1 bg-gray-100 cursor-pointer hover:bg-gray-200"
                      disabled={!hasActiveFilters}
                    >
                      <X className="h-4 w-4" />
                      Clear filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mb-4 text-muted-foreground">
            Found {filteredJobs.length} jobs
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-background border rounded-lg">
              <div className="mb-4 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                No jobs match your current search criteria. Try adjusting your filters or search term.
              </p>
              <Button onClick={resetFilters} disabled={!hasActiveFilters && !searchTerm}>
                Reset search
              </Button>
            </div>
          )}


        </div>
      </main>
      <AppFooter />
    </div>
  );
}