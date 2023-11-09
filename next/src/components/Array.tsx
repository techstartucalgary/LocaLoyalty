import { trpc } from '@/lib/trpc'
import { FC } from 'react'

interface AppProps {
  
}

const Array: FC<AppProps> = ({}) => {

    const response = trpc.getHello.useQuery()
    console.log(response.data);
  return <p className='text-white'>{response.data}</p>
}

export default Array