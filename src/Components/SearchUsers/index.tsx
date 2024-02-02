import { collection, getDocs, query, where } from "firebase/firestore"
import { useState } from "react"
import { db } from "../../firebase-config"
import SearchItem from "../SearchItem"
import { UsContext } from "../../types"

const SearchUsers = () => {
    const [text, setText] = useState<string>("")
    const [result, setResult] = useState<any>()//change type
    const userList = collection(db, "users")
    const handleSearch = async (e: any) => { //change type
        let current = e.target.value
        setText(current)

        const items = await getDocs(query(userList, where("full_name", "==", current)))
        setResult(items.docs.map(elm => {
            return {
                ...elm.data(),
                id: elm.id
            }
        }))
        // console.log(result);

    }

    return <div>
        <h2>Search</h2>
        <div>
            <label>Search for friends</label>
            <input type="text" onChange={handleSearch} value={text} />
        </div>
        <div>
            {
                result?.map((elm: any) => <SearchItem key={elm.id} person={elm} />)
            }
        </div>

    </div>
}
export default SearchUsers
//for user search