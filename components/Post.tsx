import React from "react"
import styles from '../styles/Post.module.css'
import type { IPost } from '../types/types'

type Props = {
    post?: IPost
}

const Post: React.FC<Props> = ({ post }) => {
    return (
        <div className={styles.post_container}>
            <h1>{post?.title}</h1>
            <p>{post?.description}</p>
            <p><b>ID: </b>{post?.id}</p>
        </div>
    )
}

export default Post