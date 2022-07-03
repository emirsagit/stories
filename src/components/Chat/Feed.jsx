import { SparklesIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import Input from "./Input";
import { onSnapshot, collection, query, orderBy, limit, where, getDocs } from "@firebase/firestore";
// import { db } from "../firebase";
import DirectMessage from "./DirectMessage";
import { db } from "../../../utils/firebase";
import NewMessage from "./NewMessage";
import SelectUser from "./SelectUser";
import useAuth from "../../hooks/useAuth";

const Feed = ({ messageUser, setMessageUser }) => {
  const [dm, setDm] = useState("");
  const [messages, setMessages] = useState("");
  const [selectUserIsOpen, setSelectUserIsOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const getMessages = async () => {
      const messagesRef = collection(db, "dm", dm.id, "messages");
      onSnapshot(
        query(messagesRef, orderBy("timestamp", "desc"), limit(1)),
        (snapshot) => {
          setMessages(snapshot.docs[0].data());
        }
      );
    }
    if (dm) {
      getMessages();
    }
  }, [dm])

  useEffect(() => {
    const getDms = async () => {
      const users = { [messageUser.uid]: messageUser.uid, [user.uid]: user.uid };
      const dmRef = collection(db, "dm");
      onSnapshot(
        query(dmRef, where("users", "==", users), orderBy("timestamp", "desc"), limit(1)),
        (snapshot) => {
          console.log(snapshot.docs);
          setDm(snapshot.docs[0]);
        }
      );
    }
    if (messageUser && user) {
      getDms();
    }
  }, [messageUser])


  const feedComponent =
    messageUser ?
      <>
        {messages?.messages?.length > 0 && messages.messages.map((message) => (
          <DirectMessage key={message.id} id={message.id} message={message} dm={dm.data()} />
        ))}
        <Input removeSelectedUser={() => setMessageUser(null)} messageUser={messageUser} />
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
