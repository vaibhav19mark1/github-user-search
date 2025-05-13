import { Toaster } from "sonner";
import SearchComponent from "./components/searchComponent";

export default function Home() {
  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="max-w-3xl w-full text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">GitHub User Search</h1>
          <p>Search for GitHub users and explore their repositories</p>
          <SearchComponent />
        </div>
      </div>
    </>
  );
}
