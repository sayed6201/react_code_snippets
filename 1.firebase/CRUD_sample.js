// =========================================
// Capturing Snapsot-realtime updates
// =========================================
import { db } from "../firebase";

//getting all chat messages , it updates real time
useEffect( () => {
  const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
    doc.exists() && setMessages(doc.data().messages);
  });

  return () => {
    unSub();
  };
}, [data.chatId] );

 (
  <div className="messages">
    {messages.map((m) => (
      <Message message={m} key={m.id} />
    ))}
  </div>
);

//getting all chats , it updates real time
useEffect(() => {
  const getChats = () => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setChats(doc.data());
    });

    return () => {
      unsub();
    };
  };

  currentUser.uid && getChats();
}, [currentUser.uid]);


// =========================================
// Reading doc
// =========================================
const res = await getDoc(doc(db, "chats", combinedId));


// =========================================
// creating chats and update userChats
// adding combined chatID from 2 users ID 
// =========================================

const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    }catch (err) {}

    setUser(null);
    setUsername("")
};


// =========================================
// updating a chat message in chat collection
// adding data in an array inside doc 
// =========================================
await updateDoc(doc(db, "chats", data.chatId), {
  messages: arrayUnion({
    id: uuid(),
    text,
    senderId: currentUser.uid,
    date: Timestamp.now(),
  }),
});

await updateDoc(doc(db, "userChats", currentUser.uid), {
[data.chatId + ".lastMessage"]: {
  text,
},
[data.chatId + ".date"]: serverTimestamp(),
});

 //create user chats
 await updateDoc(doc(db, "userChats", currentUser.uid), {
  [combinedId + ".userInfo"]: {
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
  },
  [combinedId + ".date"]: serverTimestamp(),
});



// =========================================
// Query
// Searching user by username
// =========================================
import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDoc,
  } from "firebase/firestore";


const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
};

//accessing users.......
{user && (
    <div className="userChat" onClick={handleSelect}>
      <img src={user.photoURL} alt="" />
      <div className="userChatInfo">
        <span>{user.displayName}</span>
      </div>
    </div>
)}



// =========================================
// Uploading image
// =========================================
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const handleSend = async () => {
  if (img) {
    const storageRef = ref(storage, uuid());

    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      (error) => {
        //TODO:Handle Error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      }
    );
  }
}



