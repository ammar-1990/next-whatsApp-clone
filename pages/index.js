import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import SideBar from '@/components/SideBar'
import { auth } from '@/firebase'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {  onAuthStateChanged } from "firebase/auth";
import { useState } from 'react'
const inter = Inter({ subsets: ['latin'] })




export default function Home() {

  const  router = useRouter()
  const [theUser , setTheUser] = useState(null)

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if(user){
        console.log(user)
        setTheUser(user)
      }
      else {
        setTheUser(null)
router.push('/login')
      }
     
    });
  },[])


  if(!theUser) return <p className='h-screen flex items-center justify-center text-gray-700 text-3xl animate-pulse'>Loading...</p>

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
