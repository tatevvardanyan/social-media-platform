import { Link } from "react-router-dom"
import { IsPersonProps } from "../../types"

const SearchItem: React.FC<IsPersonProps> = ({ person }) => {
    const defPicture = "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
    return <div>
        <img src={person.profilePicture ? person.profilePicture : defPicture} width="112px" height="112px" />
        <h3>{person.full_name}</h3>
        <Link to={"account/" + person.id}>See Profile</Link>
    </div>
}
export default SearchItem