import { Avatar } from '@mui/material' 

import { auth } from '@/firebase'
import { getOtherUsder } from '@/lib/getOtherUser'
import { useRouter } from 'next/router'


const Chat = ({id,users}) => {

    const router = useRouter()


    const user = auth.currentUser
const otherUser = getOtherUsder(users,user.email)

  return (
    <div onClick={()=>router.push(`/chat/${id}`)} className='flex items-center p-5 gap-4 hover:bg-gray-100 cursor-pointer'>
        <Avatar sx={{textTransform:'uppercase'}} >{otherUser.slice(0,1)}</Avatar>
        
        <p className='font-semibold truncate'>{otherUser}</p>
    </div>
  )
}

export default Chat