import {useEffect, useState} from 'react'
import axios, {AxiosRequestConfig} from 'axios'

interface FetchResult<T> {
    data: T | null;
    error: string | null;
    loading: boolean;
}

export function useFetch<T>(url: string, config?: AxiosRequestConfig): FetchResult<T> {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        let isMounted = true

        setLoading(true)
        axios
            .get(url, config)
            .then((response) => {
                if (isMounted) {
                    setData(response.data)
                    setError(null)
                }
            })
            .catch((err) => {
                if (isMounted) {
                    console.error('Error fetching data:', err)
                    setError('Failed to fetch data. Please try again later.')
                    setData(null)
                }
            })
            .finally(() => {
                if (isMounted) setLoading(false)
            })

        return () => {
            isMounted = false
        }
    }, [url, JSON.stringify(config)])

    return {data, error, loading}
}
