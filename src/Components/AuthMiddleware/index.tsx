import { Link, Outlet, useNavigate } from "react-router-dom"

const AuthMiddleware = () => {
    const navigate = useNavigate()
    return <div>
        <h2>Menu</h2>
        <div>
            <nav>
                <ul>
                    <li><Link to="">Profile</Link></li>
                    <li><Link to="All">All</Link></li>
                    <li><Link to="Chat">Chat</Link></li>
                </ul>
            </nav>
        </div>
        <div>
            <Outlet />
        </div>
    </div>
}
export default AuthMiddleware