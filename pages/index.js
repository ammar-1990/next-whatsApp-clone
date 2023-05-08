import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import SideBar from '@/components/SideBar'
import { auth } from '@/firebase'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {  onAuthStateChanged } from "firebase/auth";
import { useState } from 'react'
import Loading from '@/components/Loading'
import {serverTimestamp} from 'firebase/firestore'
import { db } from '@/firebase'
import { doc ,setDoc } from 'firebase/firestore'







const inter = Inter({ subsets: ['latin'] })




export default function Home() {

  const  router = useRouter()
  const [theUser , setTheUser] = useState(null)

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if(user){
      
        setTheUser(user)
        const userRef = doc(db, 'users', user.uid);
        setDoc(userRef, {email:user.email, lastSeen: new Date(Date.now()).toLocaleString() },{ merge: true });
      }
      else {
        setTheUser(null)
router.push('/login')
      }
     
    });
  },[])


  if(!theUser) return <Loading />

  return (
   <div >
  <Head>
        <title>Whats App</title>

        <link
          rel="icon"
          href="https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c543.png"
        />
      </Head>

<SideBar />
   </div>
  )
}
