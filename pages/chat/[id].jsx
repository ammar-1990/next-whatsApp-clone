import SideBar from "@/components/SideBar"
import { useRouter } from "next/router"
import { collection, query, orderBy, getDocs, doc, setDoc, serverTimestamp,getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect,useState } from "react";
import Loading from "@/components/Loading";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import Head from "next/head";
import { getOtherUsder } from "@/lib/getOtherUser";
import ChatScreen from "@/components/ChatScreen";


const ChatId = ({id}) => {

const [theUser, setTheUser] = useState(null)
const [theMessages,setTheMessages] = useState([])
const [chat , setChat] = useState(null)


    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
          if(user){
    
            setTheUser(user)
         
            const userRef = doc(db, 'users', user.uid);
            setDoc(userRef, {email:user.email, lastSeen: serverTimestamp() },{ merge: true });
          }
          else {
            setTheUser(null)
    router.push('/login')
          }
         
        });
const fetchChats = async()=>{

  const q = query(collection(db, "chats",id,'messages'), orderBy('timestamp', 'asc'));
    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTheMessages(messages)

console.log(messages)
    const chatRef = doc(db, 'chats', id);
    const chatDoc = await getDoc(chatRef);
    const theChat = {id:chatDoc.id,...chatDoc.data()}

    setChat(theChat)
    console.log(theChat)

   



}


fetchChats()
       





      },[])





    if(!theUser) return <Loading />

  return (
    <div className="flex">
         <Head>
        <title> Chat with {getOtherUsder(chat?.users,theUser?.email)}</title>

        <link
          rel="icon"
          href="https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c543.png"
        />
      </Head>
        <SideBar />
        <ChatScreen chat={chat} messages={theMessages} theUser={theUser}/>

    </div>
  )
}

export default ChatId

export async function getServerSideProps({query:{id}}){


    return {
        props :{id}
    }
}