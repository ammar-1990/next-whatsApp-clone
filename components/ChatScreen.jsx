import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Avatar, IconButton } from "@mui/material";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { useEffect, useRef, useState } from "react";
import { collection, doc, setDoc, serverTimestamp, addDoc } from "firebase/firestore";
import Moment from 'react-moment';
import { db } from "@/firebase";
import Message from "./message";
import { getOtherUsder } from "@/lib/getOtherUser";

const ChatScreen = ({ chat, messages, theUser ,id,other}) => {

    const end = useRef()

    const [input,setInput] = useState('')
useEffect(()=>{
    end.current.scrollIntoView({behavior:'smooth',block:'start'})
},[])

    const submit = async(e)=>{
        e.preventDefault()
        const userRef = doc(db, 'users', theUser.uid);
        setDoc(userRef, {email:theUser.email, lastSeen: new Date(Date.now()).toLocaleString() },{ merge: true });
        // add doc message
        await addDoc(collection(db,'chats',id,'messages'), {
            timeStamp:new Date(Date.now()).toLocaleString() ,
                message:input,
            user:theUser.email,

          });
          setInput('')
          end.current.scrollIntoView({behavior:'smooth',block:'start'})
        


    }
  return (
    <div className="flex flex-col flex-1 h-screen">
      {/* head */}
      <div className="flex justify-between p-5 px-8 sticky top-0 z-10 border border-t-0 border-l-0 border-r-0 ">
        <div className="flex gap-3 items-center">
          {getOtherUsder(chat?.users,theUser?.email)&&<Avatar sx={{cursor:'pointer',textTransform:'uppercase'}}>{getOtherUsder(chat?.users,theUser?.email)?.slice(0,1)}</Avatar>}

          <div>
            <h3 className="font-semibold ">{getOtherUsder(chat?.users,theUser.email)}</h3>
            {other&&<p className="text-gray-500 text-xs">Last seen: <Moment fromNow date={other.lastSeen} /></p>}
          </div>
        </div>
        <div className="flex items-center gap-8">
     <IconButton><MoreVertIcon /></IconButton> 
       <IconButton> <AttachFileIcon /></IconButton>
        </div>
      </div>

      {/* body */}
<div className="flex-1 bg-[#e5ded8] myScroll">
    {messages.map(el=><Message key={el.id} {...el} theUser={theUser}/>)}
<div ref={end} />

</div>

{/* add chat */}

<form onSubmit={submit} className="p-2 flex items-center gap-2">
   <IconButton><InsertEmoticonIcon sx={{color:'black'}}/></IconButton>
   <input value={input} onChange={e=>setInput(e.target.value)} type="text" className="outline-none flex-1 bg-gray-200 p-3" />
  <IconButton><MicIcon sx={{color:'black'}}/></IconButton> 
</form>
    </div>
  );
};

export default ChatScreen;
