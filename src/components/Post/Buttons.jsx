import { LuMessageCircle } from "react-icons/lu";
import { FaHeart, FaRegHeart, FaRetweet } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { auth, db } from "../../firebase";

const Buttons = ({ tweet }) => {
  // oturumu açık olan kullanıcı bu tweeti like ladı mı?
  const isLiked = tweet.likes.includes(auth.currentUser.uid);

  // like butonuna tıklanınca :

  const toggeLike = async () => {
    // güncellenilecek dökümanın referansını al
    const tweetRef = doc(db, "tweets", tweet.id);

    // kullanıcı likeladıysa:
    // user idsini likes dizisinden kaldır
    // likeladıysa user idsini likes dizisine ekle
    await updateDoc(tweetRef, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };

  return (
    <div className="flex justify-between items-center">
      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[blue]">
        <LuMessageCircle />
      </div>

      {/* <div className="p-3 rounded-full cursor-pointer transition hover:bg-[green]">
        <FaHeart />
      </div> */}

      <div
        onClick={toggeLike}
        className="p-3 rounded-full cursor-pointer transition hover:bg-[#9032a5] flex items-center gap-2"
      >
        {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        {tweet.likes.length}
      </div>

      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[green]">
        <FaRetweet />
      </div>

      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[gray]">
        <CiShare2 />
      </div>
    </div>
  );
};

export default Buttons;
