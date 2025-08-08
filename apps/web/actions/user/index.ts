import { signinType, signupType } from '@medi/common/types'
import axios from 'axios';
import toast from 'react-hot-toast';

export async function signin({ username, password }: signinType): Promise<boolean> {
     try {
          const { data } = await axios.post('http://localhost:3001/v1/auth/signin', {
               username,
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

export async  function signup({ username, password, name }: signupType): Promise<boolean> {
     try {
          const { data } = await axios.post('http://localhost:3001/v1/auth/signup', {
               name,
               username,
               password
          })
          toast.success(data.massege);
          return true;
     } catch(e) {
          if (axios.isAxiosError(e) && e.response) {
               console.error(e.response.data.messege)
               toast.error(e.response.data.messege)
          }
          return false;
     }
}