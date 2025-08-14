import axios from 'axios'
import toast from 'react-hot-toast';

const authHeader = () => ({ 
     headers : {
          'Authorization' : localStorage.getItem('token') ?? ""
     }
})

export async function getAllProduct() {
    try {
        const response = await axios.get('http://localhost:3002/v1/item');
        const product = response.data;    
        return product;
    } catch(e) {
        return [];
    }
}

export async function getOneItems(id: string) {
    try {
        const { data } = await axios.get(`http://localhost:3002/v1/item/${id}`)
        return data;
    } catch (e) {
        return {};
    }
}

export async function deleteItem(id: string): Promise<boolean> {
    try {
        const { data } = await axios.delete(`http://localhost:3002/v1/item/${id}`, authHeader())
        return true;
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            console.error(e.response.data.msg ?? e.response.data.massege)
            toast.error(e.response.data.msg ?? e.response.data.massege)
        }
        return false;
    }
}

export async function updateItem(id: string): Promise<boolean> {
    try {
        const { data } = await axios.put(`http://localhost:3002/v1/item/${id}`, authHeader())
        return true;
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            console.error(e.response.data.msg ?? e.response.data.massege)
            toast.error(e.response.data.msg ?? e.response.data.massege)
        }
        return false;
    }
}

export async function createNewItem(submitData: any) {
    try {
        console.log(submitData);
        
        const response = await axios.post('http://localhost:3002/v1/item', submitData , authHeader())
        return { auth: true, create: true};
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            console.error(e.response.data.msg ?? e.response.data.massege)
            toast.error(e.response.data.msg ?? e.response.data.massege)

            if(e.response.status === 401) {
                return { auth: false, create: false};
            }
        }
        return { auth: true, create: false};;
    }
}

