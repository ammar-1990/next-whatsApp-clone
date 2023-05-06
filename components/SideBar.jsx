import Avatar from "@mui/material/Avatar";
import { Button, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SearcIcon from "@mui/icons-material/Search";
import * as EmailValidator from "email-validator";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
const SideBar = () => {
  const createChat = async () => {
    const input = prompt("please enter an email address");
    if (!input) return null;
    if (EmailValidator.validate(input)) {
    }
  };

  return (
    <div className="max-w-[400px]">
      {/* header */}

      <div className="sticky bg-white flex justify-between top-o z-10 items-center  p-5 border  border-t-0 border-l-0 border-r-0">
      <button onClick={() => signOut(auth)}>
        <span className="hover:opacity-60">
          <Avatar sx={{ cursor: "pointer" }} alt="avatar" />
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

      <div></div>
    </div>
  );
};

export default SideBar;
