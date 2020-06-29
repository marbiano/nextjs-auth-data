import React from "react";
import moment from "moment";
import { useAuth } from "../../lib/use-auth.js";
import { useData } from "../../lib/use-data.js";

const TopPost = () => {
  const { user } = useAuth();
  const { topPosts } = useData();
  console.log(user);
  console.log(topPosts);

  return (
    <div>
      <div className="min-w-0 max-h-screen overflow-y-scroll">
        <h1>Render</h1>
        {topPosts.map(post => (
          <div key={post.id}>
            <div className="px-10 my-4 py-4 bg-white border border-8 border-gray-400 rounded-lg border-solid">
              <div className="flex justify-between">
                <span className="font-light text-black text-lg font-semibold">
                  @{post.username}
                </span>
                <span className="font-medium rounded ml-56">
                  {" "}
                  {moment(post.postDate).format("L")}.{" "}
                  {moment(post.postDate).format("LT")}
                </span>
              </div>

              <div className="mt-2">
                <p className="mt-2 text-xl text-gray-600">{post.textContent}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TopPost;
