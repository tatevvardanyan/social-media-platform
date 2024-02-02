import { useNavigate } from "react-router-dom"
import { IsPostProps } from "../../types"

const PostList: React.FC<IsPostProps> = ({ posts }) => {
    const navigate = useNavigate()
    const postDetails=(post:any)=>{//change type
        if(window.confirm("would you like to swithch to the post details page ??")){
            navigate("/profile/post/"+post.id)
        }
    }
    return <div>
        <h2>__</h2>
        <div>
            {
                posts?.map((post: any) => {//change type 
                    return (
                        <div key={post.id}>
                            <img src={post.photo} width="200px" height="200px" onClick={()=>postDetails(post)}/>
                            <p>{post.title}</p>
                            <h5>{post.likes.length + "Likes!"}</h5>
                        </div>
                    )
                })
            }
        </div>
    </div>
}
export default PostList