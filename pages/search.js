import TopPost from "../components/TopPost";
import { ProvideAuth } from "../lib/use-auth.js";

const HomePage = () => {
  return (
    <ProvideAuth>
      <TopPost />
    </ProvideAuth>
  );
};

export default HomePage;
