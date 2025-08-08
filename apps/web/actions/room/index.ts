import { createRoomType } from '@medi/common/types';
import axios, { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

type oldMsgType = {
     id: number,
     message: string,
     roomId: number,
     userId: string
}

const authHeader = () => ({ 
     headers : {
          'Authorization' : localStorage.getItem('token') ?? ""
     }
})

export async function createRoom({ name }: createRoomType): Promise<boolean> {
     try {
          const response = await axios.post('http://localhost:3001/v1/room/create-room', {
                    name
               }, authHeader())
          toast.success(`Room created with name of ${name}`)
          return true;
     } catch (e) {
          if (axios.isAxiosError(e) && e.response) {
               console.error(e.response.data.massege)
               toast.error(e.response.data.massege)
          }
          return false;
     }
}

export const getRoomId = async ({ slug }: { slug: string }): Promise<string> => {
     try {
          const { data } = await axios.get(`http://localhost:3001/v1/room/${slug}`, authHeader())
          return data.roomId;
     } catch (e) {
          if (axios.isAxiosError(e) && e.response) {
               console.error(e.response.data.massege)
               toast.error(e.response.data.massege)
          }
          return 'room not found';
     }
}

export const getRoomChat = async ({ roomId }: { roomId: string }): Promise<oldMsgType[]>=> {
     try {
          const { data } = await axios.get(`http://localhost:3001/v1/room/chat/${roomId}`, authHeader())
          return data.masseges;
     } catch (e) {
          if (axios.isAxiosError(e) && e.response) {
               console.error(e.response.data.massege)
               toast.error(e.response.data.massege)
          }
          return [];
     }
}