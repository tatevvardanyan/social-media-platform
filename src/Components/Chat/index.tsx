import { useEffect, useState } from "react"
import { IsFriendProps } from "../../types"
import { useNavigate, useOutletContext } from "react-router-dom"
import { addDoc, and, collection, doc, getDoc, getDocs, onSnapshot, or, orderBy, query, serverTimestamp, where } from "firebase/firestore"
import { db } from "../../firebase-config"
import "./style.css"

const Chat: React.FC<IsFriendProps> = ({ id, active, setActive }) => {
    const navigate = useNavigate()
    const { user } = useOutletContext<any>()
    const userList = collection(db, "users")
    const messageList = collection(db, "messages")
    const [friend, setFriend] = useState<any>(null)
    const [us, setUs] = useState<any>()
    const [messages, setMessages] = useState<string[]>([])
    const [newMessage, setNewMessage] = useState<string>("")


    const get = async () => {
        //user
        const q = query(userList, where("userId", "==", user))
        const h = await getDocs(q)
        if (h.size > 0) {
            const obj = h.docs[0]
            setUs({ ...obj.data(), id: obj.id })
            console.log(obj.data());
        }
        //friend
        const docRef = doc(db, "users", id + "")
        const obj: any = await getDoc(docRef)
        if (!obj._document) {
            return navigate("/profile/search")
        }
        setFriend({ ...obj.data(), id: obj.id })
        //message
        const q1 = query(messageList, and(or(where("userId", "==", user), where("userId", "==", obj.data().userId)), or(where("to", "==", obj.data().userId), where("to", "==", user))), orderBy("createdAt"));
        const unsuscribe = onSnapshot(q1, (snapshot) => {
            let message: any = []
            snapshot.forEach((doc) => {
                message.push({ ...doc.data(), id: doc.id })
            })
            setMessages(message)
        })

        return () => unsuscribe()
    }

    const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (newMessage === "") {
            return
        } else {
            await addDoc(messageList, {
                text: newMessage,
                name: us.full_name,
                usPhoto: us.profilePicture,
                toPhoto: friend.profilePicture,
                userId: user,
                to: friend.userId,
                createdAt: serverTimestamp()
            })

            setNewMessage("")
        }

    }

    useEffect(() => {
        get()
    }, [])

    return <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
        <div className={active ? "modal_content" : "modal_content active"} onClick={e => e.stopPropagation()}>
            <div className="mess">
                {messages.map((elm: any) => {
                    return <div key={elm.id} className={elm.userId == user ? "one special" : "one"}>
                        <h5>{elm.name}</h5>
                        <p>{elm.text}</p>
                    </div>
                })
                }
            </div>
            <form onSubmit={handleAdd} className="formchat">
                <div>
                    <textarea value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="..."></textarea>
                    <button className="material-icons"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Icons" />
                        send</button>
                </div>
            </form>
        </div>
    </div>
}
export default Chat
//for chat page