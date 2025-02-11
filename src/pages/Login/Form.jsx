import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ResetButton from "./ResetButton";

const Form = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isError, setİsError] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      // yeni kullanıcı heabı oluştur
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("Hesabınız oluşturuldu");
          navigate("/feed");
        })
        .catch((err) => toast.error("Hata!:" + err.code));
    } else {
      //varolan hesaba giriş yap
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("Hesaba giriş yapıldı");
          navigate("/feed");
        })
        .catch((err) => {
          toast.error("Hata!:" + err.code);
          if (err.code === "auth/invalid-credential") {
            setİsError(true);
          }
        });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label>Email</label>
        <input
          type="text"
          required
          className="text-black rounded mt-1 p-2 outline-none
                shadow-lg focus:shadow-[gray]"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="mt-5">Şifre</label>
        <input
          type="text"
          required
          className="text-black rounded mt-1 p-2 outline-none
                shadow-lg focus:shadow-[gray]"
          onChange={(e) => setPass(e.target.value)}
        />
        <button
          className="mt-10 bg-white text-black rounded-full p-1 font-bold
        transition hover:bg-gray-300"
        >
          {isSignUp ? "Kaydol" : "Giriş Yap"}
        </button>
      </form>

      <p className="mt-5">
        <span className="text-gray-500">
          {isSignUp ? "Hesabınız varsa" : "Hesabınız yoksa"}
        </span>
        <span
          onClick={() => setIsSignUp(!isSignUp)}
          className="cursor-pointer ms-2 text-blue-500"
        >
          {isSignUp ? "Giriş Yap" : "Kaydol"}
        </span>
      </p>
      {isError && <ResetButton email={email} />}
    </>
  );
};

export default Form;
