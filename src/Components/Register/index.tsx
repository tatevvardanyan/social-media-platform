import { useState } from "react"
import { User } from "../../types"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../firebase-config"
import { useNavigate } from "react-router-dom"
import { addDoc, collection } from "firebase/firestore"
import "./style.css"

const Register = () => {
    const navigate = useNavigate()
    const userList = collection(db, "users")
    const [user, setUser] = useState<User>({ full_name: "", age: "", login: "", password: "" })
    const [error, SetError] = useState<string>('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        createUserWithEmailAndPassword(auth, user.login, user.password)
            .then(async r => {
                SetError("")
                await addDoc(userList, {
                    full_name: user.full_name,
                    age: user.age,
                    profilePicture: "",
                    userId: r.user.uid,
                    friends: []
                })
                navigate("/")
            })
            .catch(err => {
                SetError(err.message)
            })
    }

    return <div className="block">
        {error && <p style={{ color: "red" }}>something went wrong</p>}
        <form onSubmit={handleSubmit} className="form">
            <h3>Register</h3>
            <div>
                <input
                    required
                    type="text"
                    placeholder="name surname"
                    minLength={5}
                    value={user.full_name}
                    onChange={e => setUser({ ...user, full_name: e.target.value })} />
            </div>
            <div>
                <input
                    required
                    type="number"
                    placeholder="age 13+"
                    min={13}
                    value={user.age}
                    onChange={e => setUser({ ...user, age: e.target.value })} />
            </div>
            <div>
                <input
                    required
                    type="email"
                    placeholder="email"
                    value={user.login}
                    onChange={e => setUser({ ...user, login: e.target.value })} />
            </div>
            <div>
                <input
                    required
                    type="text"
                    placeholder="min 8 symbols"
                    minLength={8}
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