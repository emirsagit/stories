import { SparklesIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import Input from "./Input";
import { onSnapshot, collection, query, orderBy, limit, where, doc, updateDoc, arrayUnion } from "@firebase/firestore";
import DirectMessage from "./DirectMessage";
import { db } from "../../../utils/firebase";
import NewMessage from "./NewMessage";
import SelectUser from "./SelectUser";
import useAuth from "../../hooks/useAuth";

const Feed = ({ messageUser, setMessageUser }) => {
  const [dm, setDm] = useState("");
  const [messages, setMessages] = useState("");
  const [lastMessages, setLastMessages] = useState("");
  const [selectUserIsOpen, setSelectUserIsOpen] = useState(false);
  const [lastDocumentFb, setLastDocumentFb] = useState("");
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  let unSubscribeForMessages = () => { }
  let unSubscribeForDms = () => { }

  useEffect(() => {
    return () => {
      unSubscribeForMessages();
      unSubscribeForDms();
    }
  }, []);

  useEffect(() => {
    if (lastMessages) {
      if (messages) {
        const existingMessages = messages.messages.filter(message => {
          const isInLastMessages = lastMessages.messages.some(lastMessage => {
            return lastMessage.createdAt.nanoseconds === message.createdAt.nanoseconds;
          })
          return !isInLastMessages;
        });
        setMessages({ ...lastMessages, messages: [...existingMessages, ...lastMessages.messages] });
      } else {
        setMessages(lastMessages);
      }
      //update firestore lastMessages
      if (! lastMessages.isReadedBy.includes[user.uid]) {
        const messagesRef = doc(db, 'dm', dm.id, 'messages', lastMessages.id);
        updateDoc(messagesRef, {
          isReadedBy: arrayUnion(user.uid)
        });
      }
    }
  }, [lastMessages])


  useEffect(() => {
    const getMessages = async () => {
      const messagesRef = collection(db, "dm", dm.id, "messages");
      unSubscribeForMessages = onSnapshot(
        query(messagesRef, orderBy("timestamp", "desc"), limit(1)),
        (snapshot) => {
          if (snapshot.docs[1]) {
            setLastMessages({ ...snapshot.docs[0].data(), messages: [...snapshot.docs[0].data().messages] });
            setLastDocumentFb(snapshot.docs[1]);
          } else {
            setLastMessages(snapshot.docs[0].data());
            setLastDocumentFb(snapshot.docs[0]);
          }
        }
      );
    }
    if (!loading && dm && !messages) {
      getMessages();
    }
  }, [dm, loading]);

  useEffect(() => {
    const getDms = async () => {
      const users = { [messageUser.uid]: messageUser.uid, [user.uid]: user.uid };
      const dmRef = collection(db, "dm");
      unSubscribeForDms = onSnapshot(
        query(dmRef, where("users", "==", users), orderBy("timestamp", "desc"), limit(1)),
        (snapshot) => {
          setDm(snapshot.docs[0]);
        }
      );
    }
    if (messageUser && user) {
      getDms();
    }
  }, [messageUser]);

  const feedComponent =
    messageUser ?
      <>
        {messages?.messages?.length > 0 && messages.messages.map((message) => (
          <DirectMessage key={message.id} id={message.id} message={message} dm={dm.data()} />
        ))}
        <Input removeSelectedUser={() => setMessageUser(null)} messageUser={messageUser} messages={messages} lastMessages={lastMessages} dm={dm} loading={loading} setLoading={setLoading} />
      </>
      :
      selectUserIsOpen ?
        <SelectUser handleClick={(user = null) => {
          if (user) {
            setMessageUser(user);
          }
          setSelectUserIsOpen(false);
        }} />
        :
        <NewMessage handleClick={() => setSelectUserIsOpen(true)} />
    ;

  return (
    <div className="lg:mt-8 mt-4 flex-grow lg:border-l lg:border-r lg:border-gray-700 max-w-2xl sm:ml-[73px] lg:ml-[370px] min-h-full">
      {feedComponent}
    </div>
  );
};

export default Feed;
