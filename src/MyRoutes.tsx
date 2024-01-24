import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Components/Login"
import Register from "./Components/Register"
import AuthMiddleware from "./Components/AuthMiddleware"
import Profile from "./Components/Profile"
import Chat from "./Components/Chat"
import All from "./Components/All"
import User from "./Components/User"

const MyRoutes = () => {
    return <BrowserRouter>
        <Routes>
            < Route index element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<AuthMiddleware />}>
                <Route path="" element={<Profile />} />
                <Route path="chat" element={<Chat />} />
                <Route path="all" element={<All />} />
                <Route path="user/:id" element={<User />} />
                <Route />
            </Route>
            <Route path="*" element={<h2>Page not found...</h2>}/>
        </Routes>
    </BrowserRouter>
}
export default MyRoutes