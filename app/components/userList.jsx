"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { UsersListSkeleton } from "./helperComponents";

const UserList = ({ query, page = 1 }) => {
  const router = useRouter();
  const usersPerPage = 10;
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const payload = {
        params: {
          q: query,
          page,
          per_page: usersPerPage,
        },
      };
      try {
        const response = await axios.get(
          "https://api.github.com/search/users",
          payload
        );

        setUsers(response.data.items);
        setTotalCount(response.data.total_count);
      } catch (err) {
        toast.error("Error while fetching users");
        setUsers([]);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchUsers();
    }
  }, [query, page]);

  const totalPages = Math.ceil(totalCount / usersPerPage);

  const handlePageChange = (newPage) => {
    router.push(`/search?q=${encodeURIComponent(query)}&page=${newPage}`);
  };

  const handleRedirect = (url) => {
    window.open(url, "_blank");
  };

  if (loading) {
    return <UsersListSkeleton />;
    // return <p>Loading</p>;
  }

  if (users.length === 0) {
    return (
      <h4 className="text-red-400 text-center mt-4">
        No GitHub users found matching &quot;{query}&quot;. Try a different
        search term.
      </h4>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Found {totalCount} users matching &quot;{query}&quot;
      </p>
      {/* User cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map(
          ({ id = "", login = "", avatar_url = "", html_url = "" }) => (
            <div
              onClick={() => router.push(`/user/${login}`)}
              key={id}
              className="rounded-lg border bg-card text-card-foreground transition-all shadow-sm hover:shadow-md h-full cursor-pointer"
            >
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-1 border-gray-700">
                    <img
                      className="aspect-square h-full w-full"
                      src={avatar_url || "/placeholder.svg"}
                      alt={login}
                    />
                    <div className="flex h-full w-full items-center justify-center rounded-full">
                      {login.slice(0, 2).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-semibold leading-none tracking-tight">
                      {login}
                    </h4>
                    <p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRedirect(html_url);
                        }}
                        className="text-sm hover:text-blue-400 cursor-pointer"
                      >
                        View on Github
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <button
            type="button"
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="flex items-center ml-2 px-5 py-2.5 text-sm font-medium rounded-lg text-center text-white bg-blue-700 hover:bg-blue-800 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </button>
          <p className="px-4">
            Page {page} of {totalPages}
          </p>
          <button
            type="button"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            className="flex items-center ml-2 px-5 py-2.5 text-sm font-medium rounded-lg text-center text-white bg-blue-700 hover:bg-blue-800 cursor-pointer"
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserList;
