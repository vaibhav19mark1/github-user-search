import UsersList from "../components/userList";
import SearchComponent from "../components/searchComponent";

const SearchPage = async ({ searchParams }) => {
  const params = await searchParams;
  const query = params.q || "";
  const page = Number.parseInt(params.page || "1");

  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto">
        <SearchComponent query={query} />
      </div>

      {query ? (
        <UsersList query={query} page={page} />
      ) : (
        <div className="text-center py-12">
          <h3>Enter a username to search</h3>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
