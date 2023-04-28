import { useState, useEffect } from 'react';
import {pb, useCurrentUser } from './lib/pocketbase'

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
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const getMessages = async () => {
        const resultList = await pb.collection('messages').getList<Message>(1, 50, {
          sort: 'created',
          expand: 'user',
          options: { timeout: 10000 }, // increase timeout duration to 10 seconds
        });
        setMessages(resultList.items);
      };

    const subscribeToMessages = async () => {
      unsubscribe = await pb.collection('messages').subscribe<Message>('*', async ({ action, record }) => {
        if (action === 'create') {
          const user = await pb.collection('users').getOne<User>(record.user);
          record.expand = { user };
          setMessages((prevMessages) => [...prevMessages, record]);
        }
        if (action === 'delete') {
          setMessages((prevMessages) => prevMessages.filter((m) => m.id !== record.id));
        }
      });
    };

    getMessages();
    subscribeToMessages();

    return () => {
      unsubscribe?.();
    };
  }, []);

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      text: newMessage,
      user: currentUser?.id,
    };
    const createdMessage = await pb.collection('messages').create<Message>(data);
    setNewMessage('');
  };

  const currentUser = useCurrentUser();

  return (
    <>
      <div className="messages">
        {messages.map((message) => (
          <div className="msg" key={message.id}>
            <img
              className="avatar"
              src={`https://avatars.dicebear.com/api/identicon/${message.expand?.user?.username}.svg`}
              alt="avatar"
              width="40px"
            />
            <div>
              <small>Sent by @{message.expand?.user?.username}</small>
              <p className="msg-text">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input placeholder="Message" type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default Messages;
