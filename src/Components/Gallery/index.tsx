import { collection, getDocs, query, where } from "firebase/firestore"
import AddPost from "../AddPost"
import PostList from "../PostList"
import { db } from "../../firebase-config"
import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"

const Gallery = () => {
    const postList = collection(db, "posts")
    const { user } = useOutletContext<any>()//change type
    const [posts, setPosts] = useState<any>()//change type
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
    }, [])

    return <div>
        <h2>Gallery</h2>
        <button onClick={() => setShowWindow(!showWindow)}>{showWindow ? "Close" : "Open"}</button>
        {showWindow && <AddPost />}
        <PostList posts={posts} />
    </div>
}
export default Gallery