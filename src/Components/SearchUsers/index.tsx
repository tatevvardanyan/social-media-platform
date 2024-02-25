import { useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase-config"
import { UsContext } from "../../types"
import SearchItem from "../SearchItem"
import "./style.css"

const SearchUsers = () => {
    const userList = collection(db, "users")
    const [result, setResult] = useState<Array<UsContext>>()
    const [text, setText] = useState<string>("")

    const handleSearch = async (e: any) => {
        let current = e.target.value
        setText(current)

        const items = await getDocs(query(userList, where("full_name", "==", current)))
        setResult(items.docs.map(elm => {
            return {
                ...elm.data(),
                id: elm.id
            }
        }))

    }

    return <div className="search">
        <div className="box0">
            <input type="text" onChange={handleSearch} value={text} placeholder="search...(n. s.)" />
        </div>
        <div className="box1">
            {
                result?.map((elm: UsContext) => <SearchItem key={elm.id} person={elm} />)
            }
        </div>

    </div>
}
export default SearchUsers
//for user search