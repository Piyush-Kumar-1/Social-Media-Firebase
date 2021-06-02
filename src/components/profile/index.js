import { useEffect, useReducer } from "react";
import { getUserPhotosByUsername } from "../../services/firebase";
import Header from "./header";
import Photos from "./photos";

export default function Profile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initislState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };

  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initislState
  );
  useEffect(() => {
    async function getProfileAndPhotos() {
      const photos = await getUserPhotosByUsername(user.username);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
    }
    if (user.username) {
      getProfileAndPhotos();
    }
  }, [user]);
  return (
    <div>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />

      <Photos photo={photosCollection} />
      {user.username}
    </div>
  );
}
