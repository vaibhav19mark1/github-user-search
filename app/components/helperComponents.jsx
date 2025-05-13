const UsersListSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="h-5 w-48 animate-pulse rounded-md bg-gray-200" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-full p-6 border rounded-lg border-gray-400">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-300 animate-pulse" />
              <div className="space-y-2">
                <div className="h-5 w-32 rounded-md bg-gray-200 animate-pulse" />
                <div className="h-4 w-24 rounded-md bg-gray-200 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const UserProfileSkeleton = () => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="h-24 w-24 md:h-32 md:w-32 rounded-full" />

          <div className="flex-grow space-y-4">
            <div>
              <div className="h-8 w-48 bg-gray-200" />
              <div className="h-4 w-full mt-2 bg-gray-200" />
              <div className="h-4 w-2/3 mt-1 bg-gray-200" />
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="h-5 w-32 bg-gray-200" />
              <div className="h-5 w-32 bg-gray-200" />
              <div className="h-5 w-32 bg-gray-200" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="h-5 w-40 bg-gray-200" />
              <div className="h-5 w-40 bg-gray-200" />
              <div className="h-5 w-40 bg-gray-200" />
              <div className="h-5 w-40 bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { UsersListSkeleton, UserProfileSkeleton };
