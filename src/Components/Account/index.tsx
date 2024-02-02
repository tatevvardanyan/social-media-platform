import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase-config"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import PostList from "../PostList"

const Account = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const postList = collection(db, "posts")
    const defultPic = "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
    const [user, setUser] = useState<any>(null)//add type
    const [posts, setPosts] = useState<any>([])//add type
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
        const obj:any = await getDoc(docRef)//add type
        if(!obj._document){
            return navigate("/profile/search")
        }
        getPosts(obj.data().userId)
        setUser({ ...obj.data(), id: obj.id })
        console.log(obj.data().userId);
    }
    useEffect(() => {
        getUser()
    }, [])

    return <div>
        <h2>Account</h2>
        {
            !user
                ?
                <p>Losading...please wait</p>
                :
                <div>
                    <div>
                        <img src={user.profilePicture || defultPic} width="112px" height="112px" />
                        <h3>{user.full_name}</h3>
                    </div>
                    <PostList posts={posts} />
                </div>
        }
    </div>
}
export default Account