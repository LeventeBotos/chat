import { useCurrentUser, login, signUp, signOut } from './lib/pocketbase';
import { useState } from 'react';

function App() {
  const currentUser = useCurrentUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSign, setIsSign] = useState('register')

  const handleSignUp = (event:any) => {
    event.preventDefault();
    signUp(username, password, name);
  };

  const handleLogin = (event:any) => {
    event.preventDefault();
    login(username, password);
  };

  return (
    <div>
      {currentUser ? (
        <p>
          Signed in as {currentUser.username}
          <button onClick={signOut}>Sign Out</button>
        </p>
      ) : (
        <div className="md:px-44 text-xl lg:text-3xl text-center">
         <div className=" h-screen ">
             <div className="p-5 h-1/3">
               <p className='text-5xl md:text-7xl'>The All New Platform</p>
               <p className='text-8xl md:text-9xl font-bold gradient'>CH@</p>
               {/* <button className="rounded-full bg-white font-bold text-[#121212] py-5 px-10" >Sign Up!</button> */}
             </div>
             <div className="p-5 h-2/3 center align-middle items-center flex flex-auto">
             <form className="w-full flex flex-col text-[#121212]" onSubmit={handleSignUp}>
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 mx-2"
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 mx-2"
          />
          <input
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 mx-2 mt-1 mb-5"
          />
          {isSign === "register" ? 
                   <button onClick={handleSignUp} className="rounded-full bg-white font-bold text-[#121212] py-5 px-10" >
                       Sign Up!</button> : 
                   <button onClick={handleLogin} className="rounded-full bg-white font-bold text-[#121212] py-5 px-10" >
                       Log In!</button>}
                   <div className="text-white">
                       {isSign === 'register' ? "Already a user? " : "New here? "}
                       {isSign === "register" ? <a onClick={() => {setIsSign('login')}}>Log In!</a> : <a onClick={() => {setIsSign('register')}}>Sign up!</a>}
                   </div>
            </form>
           </div>
         </div>
       </div>
        
      )}
    </div>
  );
}

export default App;