import { onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { auth } from "../../firebase-config"

const AuthMiddleware = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState<any>(null)
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (!user) {
                return navigate("/profile")
            } else {
                setUser(user.uid)
            }
        })
    }, [])

    const signOut = async () => {
        await auth.signOut()
        navigate("/")
    }

    return user && <div>
        <h2>Menu</h2>
        <div>
            <nav>
                <ul>
                    <li><Link to="">Profile</Link></li>
                    <li><Link to="settings">Settings</Link></li>
                    <li><Link to="chat">Chat</Link></li>
                    <li><Link to="search">Search</Link></li>
                    <li onClick={() => signOut()}>LogOut</li>

                </ul>
            </nav>
        </div>
        <div>
            <Outlet context={{ user }} />
        </div>
    </div>
}
export default AuthMiddleware