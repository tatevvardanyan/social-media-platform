import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase-config"
import { UsContext } from "../../types"
import Gallery from "../Gallery"
import Settings from "../Settings"
import "./style.css"

const Profile = () => {
    const { user } = useOutletContext<any>()
    const userList = collection(db, "users")
    const defaultPicture = 'https://cdn-icons-png.flaticon.com/512/6512/6512774.png'
    const [account, setAccount] = useState<UsContext>()
    const [on, setOn] = useState<boolean>(false)
    const getUserProfile = async () => {
        const q = query(userList, where("userId", "==", user))
        const h = await getDocs(q)
        if (h.size > 0) {
            const obj = h.docs[0]
            setAccount({ ...obj.data(), id: obj.id })
        }
    }
    useEffect(() => {
        getUserProfile()
    }, [account])

    return <div className="box">
        {!account ?
            <p>Please wait loading...</p> :
            <div className="miniBox">
                <div className="acc">
                    <div className="photo">
                        <img src={account.profilePicture ? account.profilePicture : defaultPicture} />
                    </div>
                    <div className="ab">
                        <h1>{account.full_name}</h1>
                        <h4 >
                            <span className="material-icons"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Icons" /> group</span>
                            {account.friends?account.friends.length:"0"} friends</h4>
                    </div>
                </div>
                <div className="settings">
                    {
                        on ? <div className="second">
                            <button onClick={() => setOn(!on)} >Close</button>
                            <Settings />
                        </div> :
                            <button onClick={() => setOn(!on)}>Open</button>
                    }
                </div>
                <Gallery />
            </div>
        }

    </div>
}
export default Profile
//for user page