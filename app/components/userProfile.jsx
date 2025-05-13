"use client";

import { useState, useEffect } from "react";
import { Calendar, Users, GitFork } from "lucide-react";
import { toast } from "sonner";
import { UserProfileSkeleton } from "./helperComponents";
import axios from "axios";
import { useRouter } from "next/navigation";

const UserProfile = ({ username }) => {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}`
        );
        if (!response.ok) {
          if (response.status === 404) {
            toast.error("User not found");
            return;
          }
          toast.error("GitHub API error");
        }
        const { data } = response;
        setProfile(data);
      } catch (err) {
        toast.error("User not found");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [username]);

  if (loading) {
    return <UserProfileSkeleton />;
  }

  if (!profile) {
    <h4 className="text-red-400 text-center mt-4">No profile data found</h4>;
  }

  const {
    avatar_url = "",
    login = "",
    name = "",
    html_url = "",
    bio = "",
    public_repos = "",
    followers = "",
    following = "",
    created_at = "",
  } = profile;

  const handleBackClick = () => router.back();

  return (
    <>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 ">
              <div className="h-24 w-24 md:h-32 md:w-32 shrink-0 overflow-hidden rounded-full border-1 border-gray-700">
                <img src={avatar_url} alt={login} />
                <div className="flex h-full w-full items-center justify-center rounded-full">
                  {login.slice(0, 2).toUpperCase()}
                </div>
              </div>
            </div>

            <div className="flex-grow space-y-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                    {name || login}
                  </h2>
                  <a
                    href={html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    @{login}
                  </a>
                </div>

                {bio && <p className="mt-2">{bio}</p>}
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">
                    <span className="font-medium">{followers}</span>&nbsp;
                    followers ·&nbsp;
                    <span className="font-medium">{following}</span>&nbsp;
                    following
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <GitFork className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">
                    <span className="font-medium">{public_repos}</span>{" "}
                    repositories
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">
                    Joined {new Date(created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleBackClick}
          className="flex items-center px-5 py-2.5 text-sm font-medium rounded-lg text-center text-white bg-blue-700 hover:bg-blue-800 cursor-pointer"
        >
          Back to search result
        </button>
      </div>
    </>
  );
};

export default UserProfile;
