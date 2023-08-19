import Nav from "@/components/Nav";
import { useSession, signIn } from "next-auth/react"
import { FcGoogle } from 'react-icons/fc'

export default function Layout({children}) {

  const { data: session } = useSession();

  if(!session){
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full flex justify-center">
          <button onClick={()=> signIn('google')} className="bg-white p-2 rounded-lg hover:bg-gray-200 hover:text-black duration-200 hover:scale-110 w-50 flex justify-center items-center"><FcGoogle className="mr-2"/> <span>Login with Google</span> 
          </button>
        </div>
      </div>
    )
  }

  return(
    <div className="bg-blue-900 min-h-screen flex">
      <Nav />
      <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">{children}</div>
    </div>
  )
 
}
