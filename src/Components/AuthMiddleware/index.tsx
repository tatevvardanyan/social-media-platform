import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { auth } from "../../firebase-config"
import "./style.css"

const AuthMiddleware = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState<any>(null)
    const [open, setOpen] = useState<boolean>(false)
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

    return user && <div className="blog">
        {
            !open ?
                <span className="material-icons" onClick={() => setOpen(!open)} id="circle"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Icons" />
                menu</span>
                :
                <div className="menu">
                    <nav>
                        <ul>
                            <li><Link to=""> <i className="material-icons">
                                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Icons" />
                                account_circle
                            </i></Link></li>
                            <li><Link to="search">
                                <i className="material-icons">
                                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Icons" />
                                    search
                                </i></Link></li>
                            <li onClick={() => signOut()}> <i className="material-icons">
                                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Icons" />
                                logout
                            </i></li>
                            <li onClick={() => setOpen(!open)}> <i className="material-icons">
                                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Icons" />
                                expand_more
                            </i></li>
                        </ul>
                    </nav>
                </div>
        }
        <div className="all">
            <Outlet context={{ user }} />
        </div>
    </div>
}
export default AuthMiddleware