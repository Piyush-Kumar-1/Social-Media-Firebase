import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile } from "../../services/firebase";

export default function Header({
  photosCount,
  profile,
  followerCount,
  setFollowerCount,
}) {
  const { user } = useUser();
  const prams = useParams();
  const [isFollowingProfile, setIsFollowingProfile] = useState();
  const activeButtonFollow = user?.following?.includes(prams.username);

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profile.userId
      );
      setIsFollowingProfile(isFollowing);
    };
    if (user?.username && profile?.userId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.username, profile.userId]);

  function foo(x) {
    return function () {
      x++;
      console.log(x);
    };
  }
  var x = 0;
  var bar = foo(x);
  var bip = foo(x);
  bar();
  bar();
  bip();

  // console.log(isFollowingProfile);
  // console.log(`user`, user);
  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        <img
          className="rounded-full h-40 w-40 flex"
          src={`/images/avatars/${prams.username}.jpg`}
          alt={`${prams.username} profile pic`}
        />
      </div>
      <div className="flex justify-center items-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{prams.username}</p>
          <button className="bg-blue-medium text-white p-1 rounded-md">
            {isFollowingProfile && !isFollowingProfile ? "Follow" : "Unfollow"}
          </button>
        </div>
      </div>
    </div>
  );
}
