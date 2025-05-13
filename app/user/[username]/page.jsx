import UserProfile from "@/app/components/userProfile";

const UserPage = async ({ params }) => {
  const awaitedParams = await params;
  const { username } = awaitedParams;

  return (
    <div className="space-y-6">
      <UserProfile username={username} />
    </div>
  );
};

export default UserPage;
