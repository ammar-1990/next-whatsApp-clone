import Avatar from "@mui/material/Avatar";
import { Button, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SearcIcon from "@mui/icons-material/Search";
import * as EmailValidator from "email-validator";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { signOut } from "firebase/auth";
import {  addDoc,collection ,onSnapshot,query, where} from "firebase/firestore";
import { db, auth } from "@/firebase";
import { useEffect,useState } from "react";
import Chat from "./Chat";



const SideBar = () => {

  const [chats, setChats]= useState([])
 

  const chatExists = (theEmail)=>{
 return   !!chats.find((doc) => doc.users.includes(theEmail))
  }

  const user = auth.currentUser;
useEffect(()=>{
   
    const q = query(collection(db, 'chats'),where('users', 'array-contains', user?.email))
    const unsub = onSnapshot(q,(querySnapshot) => {
        let list =[];
       querySnapshot.forEach(doc=>{
         list.push({id:doc.id,...doc.data()})
     
        })
     setChats(list)

   
     
        
       },(error)=>{
         console.log(error)
       });
       return ()=> {
         unsub();
       };

},[])

  const createChat = async () => {
    const input = prompt("please enter an email address");
    if (!input) return null;
    if (EmailValidator.validate(input) && !chatExists(input) && input !== user.email) {
       await addDoc(collection(db, "chats"), { users: [user.email, input] });
    }
  };




  return (
    <div className="w-[300px] flex flex-col h-screen">
      {/* header */}

      <div className="sticky bg-white flex justify-between top-o z-10 items-center  p-5 border  border-t-0 border-l-0 border-r-0">
        <button onClick={() => signOut(auth)}>
          <span className="hover:opacity-60">
            <Avatar
              sx={{ cursor: "pointer", textTransform: "uppercase" }}
              alt="avatar"
            >
              {auth?.currentUser?.displayName?.slice(0, 1)}
            </Avatar>
          </span>
        </button>
        <div>
          <IconButton>
            <ChatIcon />
          </IconButton>

          <IconButton>
            {" "}
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      {/* search box */}
      <div className="flex items-center p-5 gap-1">
        <SearcIcon />
        <input
          type="text"
          placeholder="Search in chats"
          className="outline-none border-none flex-1"
        />
      </div>

      {/* sidebar button */}
      <button
        onClick={createChat}
        className="w-full py-2 uppercase border border-l-0 border-r-0 hover:bg-gray-100"
      >
        start a new chat
      </button>

      {/* chats list */}

      <div className="flex-1 myScroll">
        {chats?.map((el)=><Chat key={el.id} {...el}/>)}
      </div>
    </div>
  );
};

export default SideBar;
