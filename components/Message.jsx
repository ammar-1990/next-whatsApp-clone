import Moment from "react-moment"


const Message = ({message,user,timeStamp,theUser}) => {

  return (
    <div className={`w-fit max-w-[500px] m-3 p-3 rounded-lg pb-4 ${theUser.email===user? 'ml-auto bg-[#dcf8c6] text-right':'bg-[whitesmoke] text-left'}  ` }>
   <p className="font-semibold">{message}</p>
   <p><Moment className="text-gray-500 text-xs"  date={timeStamp}  format="LT" /></p>
 



    </div>
 
  )
}

export default Message