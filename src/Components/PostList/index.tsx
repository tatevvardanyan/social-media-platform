import { useNavigate } from "react-router-dom"
import { IsPostProps, Post } from "../../types"
import "./style.css"

const PostList: React.FC<IsPostProps> = ({ posts }) => {
    const navigate = useNavigate()
    const postDetails = (post:Post) => {
        if (window.confirm("would you like to swithch to the post details page ??")) {
            navigate("/profile/post/" + post.id)
        }
    }
    return <div className="allPosts">
            {
                posts?.map((post:Post) => {
                    return (
                        <div key={post.id}>
                            <img src={post.photo} onClick={() => postDetails(post)} />
                            <p>{post.title}</p>
                            <h5>{post.likes?post.likes.length + " " + "Likes":"0 Likes"}</h5>
                        </div>
                    )
                })
            }
    </div>
}
export default PostList