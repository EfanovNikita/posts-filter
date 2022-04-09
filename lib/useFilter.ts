import { useState } from "react";
import { IPost, IOptions } from "../types/types";

export default function useFilter(posts: IPost[]): [IPost[], (options: IOptions) => void] {

    let [filtredPosts, setPosts] = useState(posts);
    
    const filter = (options: IOptions) => {
        const { name, value } = options.filter;
        let newPosts = [...posts];
        name && (newPosts = newPosts.filter(post =>
            post.title.toLocaleLowerCase().includes(name.toLocaleLowerCase())));

        value && (newPosts = newPosts.filter(post =>
            post.description.toLocaleLowerCase().includes(value.toLocaleLowerCase())));

        switch (options.sort) {
            case 'ASC':
                newPosts.sort((aPost, bPost) => aPost.id - bPost.id);
                break
            case 'DESC':
                newPosts.sort((aPost, bPost) => bPost.id - aPost.id);
                break
        }
        setPosts(newPosts);
    }
    return [filtredPosts, filter]
}
