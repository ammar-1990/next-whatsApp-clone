import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/router";

const Login = () => {
const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading , setLoading] = useState(false)


const login = async(e)=>{
e.preventDefault()
setLoading(true)
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    router.push('/')
    const user = userCredential.user;
    setLoading(false)
setEmail('')
setPassword('')
    // ...
  })
  .catch((error) => {
setLoading(false)
setEmail('')
setPassword('')
setError(error.message);
  });

}

  return (
    <div className="h-screen flex items-center justify-center flex-col bg-gray-100">
      <Head>
        <title>Login</title>

        <link
          rel="icon"
          href="https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c543.png"
        />
      </Head>
      <div className="bg-white p-8 shadow-gray-400 shadow-md flex flex-col items-center rounded-lg">
      <img src="https://www.freepnglogos.com/uploads/whatsapp-logo-image-8.png" width={300}  alt="logo" />
      <form onSubmit={login} className="w-[350px] flex  gap-4 flex-col"
    >
<input required value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email"  className="input flex-1"/>
<input required minLength={6} value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="input flex-1"/>
<button disabled={!email || !password} className="py-2 text-white bg-green-500 disabled:bg-gray-400">{loading ? 'Loading' : 'Login'}</button>
{error&&<p className="py-4 text-red-500 text-xs">{error}</p>}
        <p>Don't have an account? <Link href={'/register'}><span className="hover:underline cursor-pointer  decoration-1">register.</span></Link></p>
    </form>
      </div>
 
    </div>
  );
};

export default Login;
