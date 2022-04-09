import React from "react"
import { IPost } from "../types/types"
import styles from './Post.module.css'

type Props = {
    post: IPost
}

export default function Post({ post }: Props) {
    return (
        <div className={styles.post_container}>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <p>{post.image}</p>
            <p><b>ID: </b>{post.id}</p>
        </div>
    )
}