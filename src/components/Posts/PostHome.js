import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getAllPosts } from "../../managers/PostManager"

export const PostList = () => {
    const [posts, setPosts] = useState([])
    //const navigate = useNavigate()


    const localRareUser = localStorage.getItem("rare_user")
    const rareUserObject = JSON.parse(localRareUser)

    useEffect(() => {
        getAllPosts().then(data => setPosts(data))
    }, [])

    //useEffect hook to filter by specific state- in this case, emergency status

    return <>

        <h2>List of Posts</h2>

        <article className="posts">
            {
                posts.map(
                    (posts) => {
                        return <section className="posts">
                            <header>{posts.title}</header>
                            <header>{posts.user.first_name} {posts.user.last_name}</header>
                            <header>{posts.categories.label}</header>
                        </section>
                    }
                )
            }
        </article>
    </>
}