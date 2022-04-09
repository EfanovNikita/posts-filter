import type { NextApiRequest, NextApiResponse } from 'next'
import jsonData from '../_posts/posts.json';
import { IPost } from '../../types/types';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<IPost[]>
) {
    const data: IPost[] = jsonData;
    res.status(200).json(data)
}