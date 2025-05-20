"use client";

import { AppFooter } from "@/components/layout/app-footer";
import { AppHeader } from "@/components/layout/app-header";
import { useAuth } from "@/contexts/auth-context";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user } = useAuth();
  const { data: profile } = useUserProfile(user?.id);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <AppHeader />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-3xl space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">👤 Profile</h1>
            <p className="text-muted-foreground mt-2 text-sm">View and manage your account settings</p>
          </div>

          <div className="rounded-2xl border shadow-sm bg-card p-6 space-y-4">
            {profile ? (
              <>
                {/* User Information */}
                <Section title="User Information">
                  <Info label="Email" value={user?.email as string} />
                  <Info label="Username" value={user?.name as string} />
                </Section>

                {/* Professional Info */}
                <Section title="Professional Details">
                  <Info label="Title" value={profile.title} />
                  <Info label="Location" value={profile.location} />
                  <Info label="Experience" value={`${profile.yearsOfExperience} years`} />
                  <Info label="Level" value={profile.experienceLevel} />
                  <Info label="Remote Preference" value={profile.remotePreference} />
                </Section>

                {/* Bio */}
                <Section title="Bio">
                  <p className="text-sm text-muted-foreground">{profile.bio}</p>
                </Section>

                {/* Skills */}
                <Section title="Skills">
                  <ul className="flex flex-wrap gap-2">
                    {profile.skills?.map((skill: string, i: number) => (
                      <li
                        key={i}
                        className="bg-muted text-sm px-3 py-1 rounded-full text-foreground"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </Section>

                {/* Preferred Job Types */}
                <Section title="Preferred Job Types">
                  <ul className="flex flex-wrap gap-2">
                    {profile.preferredJobTypes?.map((type: string, i: number) => (
                      <li
                        key={i}
                        className="bg-muted text-sm px-3 py-1 rounded-full text-foreground"
                      >
                        {type}
                      </li>
                    ))}
                  </ul>
                </Section>

                {/* Meta */}
                <div className="border-t pt-4 text-xs text-muted-foreground">
                  <p>Created: {new Date(profile.createdAt).toLocaleString()}</p>
                  <p>Last updated: {new Date(profile.updatedAt).toLocaleString()}</p>
                </div>
              </>
            ) : (
              <p className="text-center text-muted-foreground">Loading profile...</p>
            )}
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function useUserProfile(id: string | undefined): { data: any } {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!id) {
      setData(null);
      return;
    }

    let cancelled = false;
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("auth_token");
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`, {
          headers: {
            Authorization: token,
          },
        });
        if (!cancelled) setData(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    }

    fetchProfile();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { data };
}
