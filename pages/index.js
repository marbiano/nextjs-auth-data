import TopPosts from "../components/TopPosts";
import { ProvideAuth } from "../lib/use-auth.js";
import { useRequireAuth } from "../lib/use-require-auth.js";
import { ProvideData } from "../lib/use-data.js";

const HomePage = () => {
  const auth = useRequireAuth();

  // If auth is null (still fetching data)
  // or false (logged out, above hook will redirect)
  // then show loading indicator.
  if (!auth) {
    return <div>Loading...</div>;
  }

  return (
    <ProvideAuth>
      <ProvideData>
        <TopPosts />
      </ProvideData>
    </ProvideAuth>
  );
};

export default HomePage;
