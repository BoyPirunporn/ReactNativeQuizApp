import React from 'react'
import LoadingSpiner from '../components/loading'
import useStoreLoading from '@/stores/useStoreLoading';


const LoadingProvider = () => {
    return (<LoadingSpiner />
  )
}

export default LoadingProvider