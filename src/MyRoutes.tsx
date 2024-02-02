import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Components/Login"
import Register from "./Components/Register"
import AuthMiddleware from "./Components/AuthMiddleware"
import Profile from "./Components/Profile"
import Chat from "./Components/Chat"
import Settings from "./Components/Settings"
import SearchUsers from "./Components/SearchUsers"
import Account from "./Components/Account"
import PostDetails from "./Components/PostDetails"

const MyRoutes = () => {
    return <BrowserRouter>
        <Routes>
            < Route index element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<AuthMiddleware />}>
                <Route path="" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                <Route path="chat" element={<Chat />} />
                {/* unfinished chat */}
                <Route path="search" element={<SearchUsers />} />
                <Route path="search/account/:id" element={<Account />} />
                <Route path="post/:id" element={<PostDetails />} />
                <Route />
            </Route>
            <Route path="*" element={<h2>Page not found...</h2>} />
        </Routes>
    </BrowserRouter>
}
export default MyRoutes