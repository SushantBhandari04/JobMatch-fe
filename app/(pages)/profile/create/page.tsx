"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/auth-context';
import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import {toast} from 'sonner';
import { Loader } from 'lucide-react';

const SKILLS_LIST = [
  "JavaScript",
  "TypeScript",
  "React",
  "Vue.js",
  "Angular",
  "Node.js",
  "Python",
  "Django",
  "Flask",
  "Java",
  "Spring",
  "C#",
  "SQL",
  "MongoDB",
  "GraphQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "Git",
  "HTML",
  "CSS",
  "TailwindCSS",
  "Redux",
  "REST API",
  "Mobile Development",
  "React Native",
  "Flutter",
  "UI/UX Design",
  "Figma",
  "Machine Learning",
  "Artificial Intelligence",
  "DevOps",
  "Security",
  "Blockchain",
];

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];
const EXPERIENCE_LEVELS = ["Entry level", "Mid level", "Senior", "Lead", "Executive"];

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Please enter your job title.",
  }),
  location: z.string().min(2, {
    message: "Please enter your location.",
  }),
  yearsOfExperience: z.coerce.number().min(0, {
    message: "Years of experience must be a positive number.",
  }),
  experienceLevel: z.string({
    required_error: "Please select your experience level.",
  }),
  bio: z.string().min(10, {
    message: "Bio should be at least 10 characters.",
  }),
  skills: z.array(z.string()).min(1, {
    message: "Please select at least one skill.",
  }),
  preferredJobTypes: z.array(z.string()).min(1, {
    message: "Please select at least one job type.",
  }),
  remotePreference: z.string({
    required_error: "Please select your remote work preference.",
  }),
});

export default function CreateProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      yearsOfExperience: 0,
      experienceLevel: "",
      bio: "",
      skills: [],
      preferredJobTypes: [],
      remotePreference: "",
    },
  });

 

    // Fetch profile if exists
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("auth_token");
      if (!user || !token) {
        router.push("/login");
        return;
      };

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`,
          { headers: { Authorization: token } }
        );

        if (res.data) {
          setHasProfile(true);
          form.reset(res.data); // set form values
        }
      } catch (err) {
        console.log("No existing profile found.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, form]);


async function onSubmit(values: z.infer<typeof formSchema>) {
  if (!user) {
    toast("Authentication required");
    router.push('/login');
    return;
  }

  setIsSubmitting(true);
  const token = localStorage.getItem("auth_token");

 try {
      const endpoint = hasProfile ? "/profile/update" : "/profile/create";
      const res = await axios[hasProfile ? "put" : "post"](
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`,
        values,
        { headers: { Authorization: token } }
      );

      toast(`Profile ${hasProfile ? "updated" : "created"} successfully`);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      toast("Failed to submit profile");
    } finally {
      setIsSubmitting(false);
    }
  };
  
   if (isLoading) return <div className="flex justify-center items-center h-screen">
              <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>;

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">{hasProfile ? "Edit" : "Create"} Your Profile</h1>
            <p className="text-muted-foreground mt-2">
              {hasProfile ? "Update your existing profile." : "Fill out your profile to get started."}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-950 border rounded-lg shadow-sm p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professional Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Frontend Developer" {...field} />
                        </FormControl>
                        <FormDescription>
                          Your current or desired job title
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. New York, NY" {...field} />
                        </FormControl>
                        <FormDescription>
                          Your current or preferred location
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="yearsOfExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="experienceLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience Level</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your experience level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {EXPERIENCE_LEVELS.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Bio</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your professional background, achievements, and career goals..."
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        A brief description of your professional experience and goals
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="skills"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Skills</FormLabel>
                        <FormDescription>
                          Select all the skills that you possess
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {SKILLS_LIST.map((skill) => (
                          <FormField
                            key={skill}
                            control={form.control}
                            name="skills"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={skill}
                                  className="flex flex-row items-start space-x-2 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(skill)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, skill])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== skill
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal text-sm cursor-pointer">
                                    {skill}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredJobTypes"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Preferred Job Types</FormLabel>
                        <FormDescription>
                          Select the types of jobs you are interested in
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {JOB_TYPES.map((type) => (
                          <FormField
                            key={type}
                            control={form.control}
                            name="preferredJobTypes"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={type}
                                  className="flex flex-row items-start space-x-2 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(type)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, type])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== type
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {type}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="remotePreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Remote Work Preference</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your remote work preference" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="remote">Remote only</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="onsite">On-site only</SelectItem>
                          <SelectItem value="flexible">Flexible (any option)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Your preference for remote, hybrid, or on-site work
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                      ? hasProfile ? "Updating..." : "Creating..."
                      : hasProfile ? "Update Profile" : "Create Profile"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}