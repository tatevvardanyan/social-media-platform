import { useState } from "react"
import { User } from "../../types"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase-config"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const [user, setUser] = useState<User>({ full_name: "", age: "", login: "", password: "" })
    const [error, SetError] = useState<string>('')
    const navigate = useNavigate()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        createUserWithEmailAndPassword(auth, user.login, user.password)
            .then(r => {
                //console.log("success", r.user.uid)
                SetError("")
                navigate("/")
            })
            .catch(err => {
                SetError(err.message)
            })
    }

    return <div>
        <h2>Register</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <div>
                <label>full name:</label>
                <input
                    required
                    type="text"
                    minLength={5}
                    placeholder="name, surname"
                    value={user.full_name}
                    onChange={e => setUser({ ...user, full_name: e.target.value })} />
            </div>
            <div>
                <label>age:</label>
                <input
                    required
                    type="number"
                    min={13}
                    placeholder="13+"
                    value={user.age}
                    onChange={e => setUser({ ...user, age: e.target.value })} />
            </div>
            <div>
                <label>email:</label>
                <input
                    required
                    type="email"
                    value={user.login}
                    onChange={e => setUser({ ...user, login: e.target.value })} />
            </div>
            <div>
                <label>password:</label>
                <input
                    required
                    type="text"
                    maxLength={8}
                    value={user.password}
                    onChange={e => setUser({ ...user, password: e.target.value })} />
            </div>
            <div>
                <button>Move</button>
            </div>
        </form>
    </div>
}
export default Register
//page for register