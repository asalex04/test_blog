import {$host, $authHost} from "./index";

export const createPost = async (post: FormData) => {
    const {data} = await $authHost.post('api/post', post)
    return data
}

export const fetchAllPosts = async () => {
    const {data} = await $host.get('api/post')
    return data
}

export const fetchOnePost = async (id: string) => {
    const {data} = await $host.get(`api/post/${id}`)
    return data
}

export const deletePost = async (id: string) => {
    const {data} = await $authHost.delete(`api/post/${id}`)
    return data
}

export const updatePost = async (id: string, post: FormData) => {
    const {data} = await $authHost.put(`api/post/${id}`, post)
    return data
}

