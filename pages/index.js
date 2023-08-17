import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {

  const { data: session } = useSession();

  if(!session){
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button onClick={()=> signIn('google')} className="bg-white p-2 rounded-lg hover:bg-red-500 hover:text-white duration-200 hover:scale-110">Login with Google</button>
        </div>
      </div>
    )
  }

  return(
    <div className="bg-white-900 w-screen h-screen">
      <div className="">logged in {session.user.email}</div>
      <button onClick={() => signOut()} className="bg-red-900 text-white p-2 rounded-lg hover:bg-violet-600 duration-200 hover:scale-110">Sign out</button>
    </div>
  )
 
}