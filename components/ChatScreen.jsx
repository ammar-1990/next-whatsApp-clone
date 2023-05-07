import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Avatar, IconButton } from "@mui/material";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { useState } from "react";

const ChatScreen = ({ chat, messages, theUser }) => {

    const [input,setInput] = useState('')
  return (
    <div className="flex flex-col flex-1 h-screen">
      {/* head */}
      <div className="flex justify-between p-5 px-8 sticky top-0 z-10 border border-t-0 border-l-0 border-r-0 ">
        <div className="flex gap-3 items-center">
          <Avatar sx={{cursor:'pointer'}}></Avatar>

          <div>
            <h3 className="font-semibold ">other email</h3>
            <p className="text-gray-500 text-xs">last seen</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
     <IconButton><MoreVertIcon /></IconButton> 
       <IconButton> <AttachFileIcon /></IconButton>
        </div>
      </div>

      {/* body */}
<div className="flex-1 bg-[#e5ded8]">


</div>

{/* add chat */}

<form className="p-2 flex items-center gap-2">
   <IconButton><InsertEmoticonIcon sx={{color:'black'}}/></IconButton>
   <input value={input} onChange={e=>setInput(e.target.value)} type="text" className="outline-none flex-1 bg-gray-200 p-3" />
  <IconButton><MicIcon sx={{color:'black'}}/></IconButton> 
</form>
    </div>
  );
};

export default ChatScreen;
