//using managemenuitem component

import React from 'react'
import useAxiosPublic from './UseAxiosPublic'
import {useQuery} from '@tanstack/react-query'

const UseMenu = () => {
  const axiosPublic = useAxiosPublic();

  const {data: menu =[], isPending: loading, refetch} = useQuery({
      queryKey: ['menu'],
      queryFn: async () => {
          const res = await axiosPublic.get('/menu');
          console.log(res.data)
          return res.data;
        },
  })

return [menu, loading, refetch]
}

export default UseMenu