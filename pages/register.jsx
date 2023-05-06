import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";

const register = () => {
    const router = useRouter()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: name,
        });
      }).then(()=>{router.push('/')
    setLoading(false)
    setEmail('')
    setPassword('')
    setName('')
    
    })
      .catch((error) => {
        setError(error.message);
        setLoading(false)
        setEmail('')
        setPassword('')
        setName('')
        // ..
      });
  };
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <Head>
        <title>Register</title>

        <link
          rel="icon"
          href="https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c543.png"
        />
      </Head>
      <img
        src="https://www.freepnglogos.com/uploads/whatsapp-logo-image-8.png"
        width={300}
        alt="logo"
      />
      <form onSubmit={register} className="w-[350px] flex  gap-4 flex-col">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
          className="input flex-1"
        />
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="input flex-1"
        />
        <input
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="input flex-1"
        />

        <button
          disabled={!name || !email || !password}
          className="py-2 text-white bg-green-500 disabled:bg-gray-400"
        >
          {loading ? "Loading..." : "Register"}
        </button>
        {error && <p className="text-red-500 text-xs py-4">{error}</p>}
        <p>
          Back to{" "}
          <Link href={"/login"}>
            <span className="hover:underline cursor-pointer  decoration-1">
              login.
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default register;
