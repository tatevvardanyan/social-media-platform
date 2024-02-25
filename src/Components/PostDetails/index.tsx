import { useContext, useEffect, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { UsContext } from "../../types"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase-config"
import "./style.css"

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
    return <div className="det">
        <button onClick={()=>navigate('/profile')} className="material-icons"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Icons" />
            arrow_back_ios_new</button>
        {
            post && <div className="post">
                <img src={post.photo} />
                <h5>{post.title}</h5>
                <div>
                    {
                        didLike
                            ?
                            <button onClick={handleUnlike} className="material-icons"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Icons" />
                                thumb_down</button>
                            :
                            <button onClick={handleLike} className="material-icons"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Icons" />
                                thumb_up</button>
                    }
                    <p>( {post.likes.length} Likes )</p>
                </div>
            </div>
        }
    </div>
}
export default PostDetails