export interface User {
  id: string;
  name?: string;
  email: string;
}

export interface UserProfile {
  userId: string;
  title: string;
  location: string;
  yearsOfExperience: number;
  experienceLevel: string;
  bio: string;
  skills: string[];
  preferredJobTypes: string[];
  remotePreference: string;
}