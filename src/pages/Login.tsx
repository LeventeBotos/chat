import { currentUser } from "./lib/pocketbase"
import SignedIn from "./SignedIn"
import SignUp from "./SignUp"

export default function Login() {
  return (
    <div>
        {currentUser === undefined ? <SignedIn /> : <SignUp />}
    </div>
  )
}