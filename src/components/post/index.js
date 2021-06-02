import { useRef } from "react";
import Actions from "./actions";
import Comments from "./comments";
import Footer from "./footer";
import Header from "./header";
import Image from "./image";

export default function Post({ content }) {
  const commentInput = useRef(null);
  const handleFocus = () => {
    commentInput.current?.focus();
  };
  return (
    <div className="rounded col-span-3 border border-gray-primary bg-white mb-8">
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content?.docId}
        totalLikes={content?.likes?.length}
        likedPhoto={content?.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={content.caption} username={content.username} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
}
