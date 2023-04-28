import PocketBase from 'pocketbase';
import { useState, useEffect } from 'react';

export const pb = new PocketBase('');

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(pb.authStore.model);

  useEffect(() => {
    const onChange = (auth:any) => {
      console.log('authStore changed', auth);
      setCurrentUser(pb.authStore.model);
    };

    pb.authStore.onChange(onChange);

    return () => {
      // pb.authStore.offChange(onChange);
    };
  }, []);

  return currentUser;
};

export const login = async (username:string, password:string) => {
  const user = await pb.collection('users').authWithPassword(username, password);
  console.log(user);
};

export const signUp = async (username:string, password:string, name:string) => {
  try {
    const data = {
      username,
      password,
      passwordConfirm: password,
      name,
    };
    const createdUser = await pb.collection('users').create(data);
    await login(username, password);
  } catch (err) {
    console.error(err);
  }
};

export const signOut = () => {
  pb.authStore.clear();
};

// import PocketBase from 'pocketbase';
// import { writable } from 'svelte/store';
// import { useState } from 'react';

// export const pb = new PocketBase('http://80.98.246.4:8090'); 

// export const currentUser = writable(pb.authStore.model);

// pb.authStore.onChange((auth) => {
//     console.log('authStore changed', auth);
//     currentUser.set(pb.authStore.model);
// });

export default function pocketbase() {
  return (
    <div>
      Dont use this!
    </div>
  )
}
