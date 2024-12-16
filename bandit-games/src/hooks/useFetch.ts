import {useEffect, useState} from 'react'
import axios, {AxiosRequestConfig} from 'axios'

const apiUrl = import.meta.env.VITE_LOCAL_BASE_URL

export function useFetch<T>(endpoint: string, config?: AxiosRequestConfig) {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        let isMounted = true

        setLoading(true)
        axios
            .get(`${apiUrl}${endpoint}`, config)
            .then((response) => {
                if (isMounted) {
                    setData(response.data)
                    setError(null)
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError('Failed to fetch data. Please try again later.')
                    console.error(err)
                }
            })
            .finally(() => {
                if (isMounted) setLoading(false)
            })

        return () => {
            isMounted = false
        }
    }, [endpoint, JSON.stringify(config)])

    return {data, error, loading}
}
