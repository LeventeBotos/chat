import { useState } from 'react'
import { pb} from './lib/pocketbase'

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isSign, setIsSign] = useState('register')

    async function login(ev?:any) {
        // ev.preventDefault()
        try {
            console.log(username, password)
            await pb.collection('users').authWithPassword(username, password)
            console.log("logged in")
        } catch (err) {
            console.error('Failed to register user:', err)
        }
    }

    async function signup() {
        try {
            const data = {
                username,
                password,
                passwordConfirm: password
            }
            console.log(data)
            await pb.collection('users').create(data)
            console.log('created')
            await login()
        } catch (err) {
            console.error(err)
        }
    }

    function signOut() {
        pb.authStore.clear()
    }

    return(
        <div className="md:px-44 text-xl lg:text-3xl text-center">
      <div className=" h-screen ">
          <div className="p-5 h-1/3">
            <p className='text-5xl md:text-7xl'>The All New Platform</p>
            <p className='text-8xl md:text-9xl font-bold gradient'>CH@</p>
            {/* <button className="rounded-full bg-white font-bold text-[#121212] py-5 px-10" >Sign Up!</button> */}
          </div>
          <div className="p-5 h-2/3 center align-middle items-center flex flex-auto">
            <form className="w-full flex flex-col text-[#121212]" onSubmit={login} >
                <input value={username} onChange={ev => setUsername(ev.target.value)} type="text" name="username" placeholder="username" className="p-2 mx-2"/>
                <input value={password} onChange={ev => setPassword(ev.target.value)} type="password" name="password" placeholder="password" className="p-2 mx-2 mt-1 mb-5" />
                
                {isSign === "register" ? 
                <button onClick={(ev) => {
                    ev.preventDefault()
                    signup()
                }} className="rounded-full bg-white font-bold text-[#121212] py-5 px-10" >
                    Sign Up!</button> : 
                <button onClick={(ev) => {
                    ev.preventDefault()
                    login()
                }} className="rounded-full bg-white font-bold text-[#121212] py-5 px-10" >
                    Log In!</button>}
                {/* <button className="rounded-full bg-white font-bold text-[#121212] py-5 px-10" >
                    {isSign === "register" ? 'Sign up!' : "Log in!"}
                </button> */}
                <div className="text-white">
                    {isSign === 'register' ? "Already a user? " : "New here? "}
                {/* <button id='a' onClick={() => {
                    {isSign === "register" ? setIsSign('login') : setIsSign("register")}
                    // setIsSign('login')
                }}> */}
                    {isSign === "register" ? <a onClick={() => {setIsSign('login')}}>Log In!</a> : <a onClick={() => {setIsSign('register')}}>Sign up!</a>}
                {/* </button> */}
                </div>
            </form>
        </div>
      </div>
    </div>
    )
}

export default SignUp