import { useContext, useEffect, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { UsContext } from "../../types"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase-config"

const PostDetails = () => {
    const { id } = useParams()
    const { user } = useOutletContext<any>()//change type
    const [post, setPost] = useState<any>(null)
    const navigate = useNavigate()
    const [didLike, setDidLike] = useState<boolean>(false)
    const getPostInf = async () => {
        const item = doc(db, "posts", id + "")
        const obj: any = await getDoc(item)//change type
        if (!obj._document) {
            return navigate("/profile")
        }
        if (obj.data().likes.includes(user)) {
            setDidLike(true)
        }
        setPost(obj.data())
    }
    const handleLike = async () => {
        const currentPost = doc(db, "posts", id + "")
        let likes = [...post.likes, user]
        await updateDoc(currentPost, { likes })
        setDidLike(true)
        setPost({ ...post, likes: likes })
    }
    const handleUnlike = async () => {
        const currentPost = doc(db, "posts", id + "")
        let temp = [...post.likes]
        temp.splice(post.likes.indexOf(user), 1)
        await updateDoc(currentPost, { likes: temp })
        setDidLike(false)
        setPost({ ...post, likes: [...temp] })
    }
    useEffect(() => {
        getPostInf()
    }, [])
    return <div>
        <h1>Post Details</h1>
        {
            didLike
                ?
                <button onClick={handleUnlike}>UnLike</button>
                :
                <button onClick={handleLike}>Like</button>
        }
        {
            post && <div>
                <h3>{post.title}({post.likes.length}Likes)</h3>
                <img src={post.photo} />
            </div>
        }
    </div>
}
export default PostDetails