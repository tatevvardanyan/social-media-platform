import { useState } from "react"
import { Us_1 } from "../../types"
import { Link, useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase-config"
import "./style.css"


const Login = () => {
    const navigate = useNavigate()
    const [user, SetUser] = useState<Us_1>({ login: "", password: "" })
    const [error, SetError] = useState<string>("")
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        signInWithEmailAndPassword(auth, user.login, user.password)
            .then(r => {
                navigate("/profile")
                SetError("")
            })
            .catch(err => SetError(err.message))
    }

    return <div className="block">
        <div className="about">
            <h1>Welcome to SMMP</h1>
            <h2>Small</h2>
            <h2>Social</h2>
            <h3>Media</h3>
            <h4>Platform</h4>
        </div>
        <div className="form">
            <h3>Login</h3>
            {error && <p style={{ color: "red" }}>something went wrong</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <i className="material-icons">
                        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Icons" />
                        person
                    </i>
                    <input
                        required
                        type="email"
                        value={user.login}
                        onChange={e => SetUser({ ...user, login: e.target.value })} />
                </div>
                <div>
                    <i className="material-icons">
                        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Icons" />
                        lock
                    </i>
                    <input
                        required
                        type="password"
                        value={user.password}
                        onChange={e => SetUser({ ...user, password: e.target.value })} />
                </div>
                <div>
                    <button>Login</button>
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    </div>
}
export default Login
//for Login page