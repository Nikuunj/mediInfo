import { itemType } from '@medi/common/types'
import axios from 'axios';
import toast from 'react-hot-toast';

const authHeader = () => ({ 
     headers : {
          'Authorization' : localStorage.getItem('token') ?? ""
     }
})
export async function getAllitems(): Promise<boolean> {
    try {
        const { data } = await axios.post('http://localhost:3001/v1/auth/signin')
         
        return true;
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            console.error(e.response.data.massege)
            toast.error(e.response.data.massege)
        }
        return false;
    }
}


export async function getOneItems(): Promise<boolean> {
    try {
        const { data } = await axios.post('http://localhost:3001/v1/auth/signin')
         
        return true;
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            console.error(e.response.data.massege)
            toast.error(e.response.data.massege)
        }
        return false;
    }
}

export async function deleteItem(): Promise<boolean> {
    try {
        const { data } = await axios.post('http://localhost:3001/v1/auth/signin', { }, authHeader())
         
        return true;
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            console.error(e.response.data.massege)
            toast.error(e.response.data.massege)
        }
        return false;
    }
}

export async function updateItem(): Promise<boolean> {
    try {
        const { data } = await axios.post('http://localhost:3001/v1/auth/signin', { }, authHeader())
         
        return true;
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            console.error(e.response.data.massege)
            toast.error(e.response.data.massege)
        }
        return false;
    }
}

export async function createNewItem(): Promise<boolean> {
    try {
        const { data } = await axios.post('http://localhost:3001/v1/auth/signin', { }, authHeader())
         
        return true;
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            console.error(e.response.data.massege)
            toast.error(e.response.data.massege)
        }
        return false;
    }
}

