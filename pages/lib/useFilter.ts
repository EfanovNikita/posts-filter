import { IPost, IOptions } from "../../types/types";

export default function useFilter(posts: IPost[], options: IOptions): IPost[] {
    let filtredPosts = [...posts];
    let { name, value } = options.filter;

    name && (filtredPosts = filtredPosts.filter(post => 
        post.title.toLocaleLowerCase().includes(name.toLocaleLowerCase())));
    
    value && (filtredPosts = filtredPosts.filter(post => 
        post.description.toLocaleLowerCase().includes(value.toLocaleLowerCase())));
    
    switch (options.sort) {
        case 'ASC':
            filtredPosts.sort((aPost, bPost) => aPost.id - bPost.id);
            break
        case 'DESC':
            filtredPosts.sort((aPost, bPost) => bPost.id - aPost.id);
            break
    }
    return filtredPosts
}
