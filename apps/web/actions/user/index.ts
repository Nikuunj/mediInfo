import { signinType } from '@medi/common/types'
import axios from 'axios';
import toast from 'react-hot-toast';

export async function signin({ email, password }: signinType): Promise<boolean> {
     try {
          const { data } = await axios.post('http://localhost:3001/v1/auth/signin', {
               email,
               password
          })
          localStorage.setItem('token', data.token);
          return true;
     } catch (e) {
          if (axios.isAxiosError(e) && e.response) {
               console.error(e.response.data.massege)
               toast.error(e.response.data.massege)
          }
          return false;
     }
}