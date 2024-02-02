import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase-config"
import Gallery from "../Gallery"

const Profile = () => {
    const { user } = useOutletContext<any>()
    const [account, setAccount] = useState<any>(null)
    const userList = collection(db, "users")
    const defaultPicture = 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0='
    const getUserProfile = async () => {
        const q = query(userList, where("userId", "==", user))
        const h = await getDocs(q)
        if (h.size > 0) {
            const obj = h.docs[0]
            setAccount({ ...obj.data(), id: obj.id })
        }
    }
    useEffect(() => {
        console.log(account);
        getUserProfile()
    }, [])

    return <div>
        <h2>Profile</h2>
        {!account ?
            <p>Please wait loading...</p> :
            <div>
                <img src={account.profilePicture ? account.profilePicture : defaultPicture} width='112px' height='112px' />
                <h1>{account.full_name}</h1>
            </div>}
            <Gallery/>

    </div>
}
export default Profile
//for user page