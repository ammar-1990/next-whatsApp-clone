
import { RotatingLines } from  'react-loader-spinner'

const Loading = () => {
  return (
    <div className='flex h-screen items-center justify-center gap-8 flex-col bg-gray-100'>

<img src="https://www.freepnglogos.com/uploads/whatsapp-logo-image-8.png" width={300}  alt="logo" />
<RotatingLines
  strokeColor="green"
  strokeWidth="5"
  animationDuration="0.75"
  width="96"
  visible={true}
/>

    </div>
  )
}

export default Loading