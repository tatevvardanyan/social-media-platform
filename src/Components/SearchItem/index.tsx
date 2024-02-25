import { Link } from "react-router-dom"
import { IsPersonProps } from "../../types"
import "./style.css"

const SearchItem: React.FC<IsPersonProps> = ({ person }) => {
    const defPicture = "https://cdn-icons-png.flaticon.com/512/6512/6512774.png"
    return <div className="us">
        <img src={person.profilePicture ? person.profilePicture : defPicture} alt="profile photo" />
        <div>
            <h3><Link to={"account/" + person.id}>{person.full_name}</Link></h3>
            <h5>{person.friends ? person.friends.length + " " + "friends" + " " : "0"}
                <span className="material-icons"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Icons" /> group</span></h5>
        </div>
    </div>
}
export default SearchItem