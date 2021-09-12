import { useEffect, useState } from 'react';

export default function useFetch(url, method, headers) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [result, setResult] = useState(null);

    useEffect(() => {
        async function getFetch() {
            try {
                setLoading(true);
                setError(false);
                const response = await fetch(url, {
                    method: method || 'GET',
                    headers: headers,
                });

                const data = response.json();
                setResult(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(true);
            }
        }

        getFetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { loading, error, result };
}
