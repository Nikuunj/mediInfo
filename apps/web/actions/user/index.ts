import { signinType } from '@medi/common/types'
import axios from 'axios';
import toast from 'react-hot-toast';

export async function signin({ email, password }: signinType): Promise<string> {
     try {
          const reponse = await axios.post('http://localhost:3002/v1/admin/signin', {
               email,
               password
          })

          
          return reponse.data.token;
     } catch (e) {
          if (axios.isAxiosError(e) && e.response) {
               console.error(e.response);
               console.error(e.response.data.msg)
               toast.error(e.response.data.msg ?? e.response.data.massege)
          }
          return '';
     }
}