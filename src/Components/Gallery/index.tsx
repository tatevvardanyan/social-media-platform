import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase-config"
import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"
import { Post } from "../../types"
import AddPost from "../AddPost"
import PostList from "../PostList"
import "./style.css"


const Gallery = () => {
    const postList = collection(db, "posts")
    const { user } = useOutletContext<any>()
    const [posts, setPosts] = useState<Array<Post> | Post>()//change type
    const [showWindow, setShowWindow] = useState<boolean>(false)
    const getPost = async () => {
        const items = await getDocs(query(postList, where("userId", "==", user)))
        setPosts(items.docs.map(elm => ({
            ...elm.data(),
            id: elm.id
        })))
    }
    useEffect(() => {
        getPost()
    }, [posts])

    return <div className="gallery">
        <button onClick={() => setShowWindow(!showWindow)}>{showWindow ? "Close" : "Open"}</button>
        {showWindow && <AddPost />}
        <PostList posts={posts} />
    </div>
}
export default Gallery