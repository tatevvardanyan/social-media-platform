import { addDoc, collection } from "firebase/firestore"
import { useRef, useState } from "react"
import { db, storage } from "../../firebase-config"
import { useOutletContext } from "react-router-dom"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"


const AddPost = () => {
    const photoRef = useRef<any>()//change type
    const postList = collection(db, "posts")
    const [text, setText] = useState<string>("")
    const { user } = useOutletContext<any>()
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)

        const file = photoRef.current.files[0]
        if (!file) {
            return
        }
        const storageRef = ref(storage, `posts/${Date.now() + file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", null, null, () => {
            console.log("Uploaded...");

            getDownloadURL(uploadTask.snapshot.ref)
                .then(async (downloadURL) => {
                    await addDoc(postList, {
                        userId: user,
                        photo: downloadURL,
                        title: text,
                        likes: []
                    })
                    setText("")
                    photoRef.current.value = ""
                    setLoading(false)
                })

        })
    }

    return <div>
        <h2>--</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={text} onChange={e => setText(e.target.value)} />
                <input type="file" ref={photoRef} />
            </div>
            <div>
                <button disabled={loading} type="submit">Post</button>
            </div>
        </form>
    </div>
}
export default AddPost