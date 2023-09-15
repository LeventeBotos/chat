"use client";

import { useState, useEffect } from "react";
interface User {
  id: string;
  username: string;
}

interface Message {
  id: string;
  text: string;
  user: string;
  expand?: {
    user: User;
  };
}

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const getMessages = async () => {
      // const resultList = await pb.collection('messages').getList<Message>(1, 50, {
      //   sort: 'created',
      //   expand: 'user',
      //   options: { timeout: 10000 }, // increase timeout duration to 10 seconds
      // });
      // setMessages(resultList.items);
    };

    const subscribeToMessages = async () => {
      // unsubscribe = await pb.collection('messages').subscribe<Message>('*', async ({ action, record }) => {
      //   if (action === 'create') {
      //     const user = await pb.collection('users').getOne<User>(record.user);
      //     record.expand = { user };
      //     setMessages((prevMessages) => [...prevMessages, record]);
      //   }
      //   if (action === 'delete') {
      //     setMessages((prevMessages) => prevMessages.filter((m) => m.id !== record.id));
      //   }
      // });
    };

    getMessages();
    subscribeToMessages();

    return () => {
      unsubscribe?.();
    };
  }, []);

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const data = {
    //   text: newMessage,
    //   user: currentUser?.id,
    // };
    // const createdMessage = await pb.collection('messages').create<Message>(data);
    setNewMessage("");
  };

  // const currentUser = useCurrentUser();

  return (
    <div className="">
      <div className="">
        {messages.map((message) => (
          <div
            className="flex flex-row bg-slate-600 rounded-xl p-2 m-5"
            key={message.id}
          >
            <div>
              <img
                className="avatar"
                src={`https://avatars.dicebear.com/api/identicon/${message.expand?.user?.username}.svg`}
                alt="avatar"
                width="40px"
              />
            </div>
            <div className="pl-3">{message.text}</div>
          </div>
        ))}
      </div>

      <form className=" flex flex-row justify-between" onSubmit={sendMessage}>
        <input
          className=""
          placeholder="Message"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="bg-slate-600" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Messages;
