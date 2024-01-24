import { useState } from "react"
import { Us_1 } from "../../types"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase-config"

const Login = () => {
    const [user, SetUser] = useState<Us_1>({ login: "", password: "" })
    const [error, SetError] = useState<string>()
    const navigate = useNavigate()
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        signInWithEmailAndPassword(auth, user.login, user.password)
            .then(r => {
                navigate("/profile")
                SetError("")
            })
            .catch(err => SetError(err.message))
    }
    return <div>
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email address:</label>
                <input
                    type="email"
                    required
                    value={user.login}
                    onChange={e => SetUser({ ...user, login: e.target.value })} />
            </div>
            <div>
                <label>password:</label>
                <input
                    type="password"
                    required
                    value={user.password}
                    onChange={e => SetUser({ ...user, password: e.target.value })} />
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    </div>
}
export default Login
//for Login page