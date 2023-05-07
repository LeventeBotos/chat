import Login from './Login'
import Messages from './Messages'
import { useCurrentUser } from './lib/pocketbase'

export default function Home() {
  const currentUser = useCurrentUser();
  return (
    <div>
       {/* {currentUser ? (
          <Messages />
      ) : (
        <Login />
      )} */}
        <Login />
    </div>
  )
}
