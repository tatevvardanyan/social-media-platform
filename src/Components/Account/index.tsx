import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from "../../firebase-config"
import { useEffect, useState } from "react"
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom"
import PostList from "../PostList"
import Chat from "../Chat"
import "./style.css"
import { Post, UsContext } from "../../types"

const Account = () => {
    const { user } = useOutletContext<any>()
    const { id } = useParams()
    const navigate = useNavigate()
    const postList = collection(db, "posts")
    const defultPic = "https://cdn-icons-png.flaticon.com/512/6512/6512774.png"
    const [button, setButton] = useState<boolean>(false)
    const [didFriend, setDidFriend] = useState<boolean>(false)
    const [user_1, setUser] = useState<any>([])
    const [posts, setPosts] = useState<Array<Post>>([])
    const [showChat, setShowChat] = useState<boolean>(false)

    const getPosts = async (id: string) => {
        const items = await getDocs(query(postList, where("userId", "==", id)))
        setPosts(items.docs.map(elm => {
            return {
                ...elm.data(),
                id: elm.id
            }
        }))
    }

    const getUser = async () => {
        const docRef = doc(db, "users", id + "")
        const obj: any = await getDoc(docRef)
        if (!obj._document) {
            return navigate("/profile/search")
        }
        getPosts(obj.data().userId)
        setUser({ ...obj.data(), id: obj.id })
        if (obj.data().userId == user) {
            setButton(true)
        }
        if (obj.data().friends.includes(user)) {
            setDidFriend(true)
        }
    }

    const handleFriend = async () => {
        const us = doc(db, "users", id + "")
        let friends = [...user_1.friends, user]
        await updateDoc(us, { friends })
        setDidFriend(true)
        setUser({ ...user_1, friends: friends })
    }

    const handleUnfriend = async () => {
        const us = doc(db, "users", id + "")
        let friends = [...user_1.friends]
        friends.splice(user_1.friends.indexOf(user), 1)
        await updateDoc(us, { friends: friends })
        setDidFriend(false)
        setUser({ ...user_1, friends: [...friends] })
    }

    useEffect(() => {
        getUser()
    }, [])

    return <div className="box">
        {!user_1 ?
            <p>Please wait loading...</p> :
            <div className="miniBox">
                <div className="acc">
                    <div className="photo">
                        <img src={user_1.profilePicture || defultPic} />

                    </div>
                    <div className="ab">
                        <h3>{user_1.full_name}</h3>
                        <h5>
                            <span className="material-icons"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Icons" /> group</span>
                            {user_1.friends ? user_1.friends.length : "0"}   friends
                        </h5>
                    </div>
                    <div className="box3">
                        {button ?
                            <div></div> :
                            didFriend ?
                                <div className="btns">
                                    <button onClick={handleUnfriend} className="unfol">Unfollow</button>
                                    <button onClick={() => setShowChat(true)} className="btnchat">{showChat ? "Close" : "Open"}</button>
                                    {showChat && <Chat id={id} active={showChat} setActive={setShowChat} />}
                                </div>
                                :
                                <button onClick={handleFriend} className="fol">Follow</button>
                        }
                    </div>
                </div>
                <PostList posts={posts} />
            </div>
        }
    </div>
}
export default Account
//serach person Account