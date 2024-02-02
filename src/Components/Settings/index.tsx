import { useRef } from "react"
import { db, storage } from "../../firebase-config"
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { updateDoc, collection, doc, query, where, getDocs } from "firebase/firestore"
import { useNavigate, useOutletContext } from "react-router-dom"

const Settings = () => {
    const photoRef = useRef<string | any>()//change type

    const userList = collection(db, "users")
    const { user } = useOutletContext<any>()//change type

    const navigate = useNavigate()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const file = photoRef.current.files[0]

        if (!file) {
            return
        }
        const storageRef = ref(storage, `files/${Date.now() + file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", null, null, () => {
            console.log("Uploaded...");
            getDownloadURL(uploadTask.snapshot.ref)
                .then(async (downloadURL) => {
                    const q = query(userList, where("userId", "==", user));
                    const info = await getDocs(q)
                    if (info.size > 0) {
                        let id = info.docs[0].id
                        await updateDoc(doc(db, "users", id), { profilePicture: downloadURL })
                        navigate("/profile")
                    }
                })

        })
    }

    return <div>
        <h2>Settings</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="file" ref={photoRef} />
                <button type="submit">Upload!</button>
            </div>
        </form>
    </div>
}
export default Settings