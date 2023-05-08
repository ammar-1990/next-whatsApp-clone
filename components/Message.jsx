

const Message = ({message,user,timeStamp}) => {

  return (
    <div>
   <p>{message}</p>
  <p>{timeStamp}</p>
   <p>{user}</p>



    </div>
 
  )
}

export default Message