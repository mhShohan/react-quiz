import {
    get,
    getDatabase,
    limitToFirst,
    orderByKey,
    query,
    ref,
    startAt,
} from 'firebase/database';
import { useEffect, useState } from 'react';

export default function useVideoList(page) {
    const [videos, setVideos] = useState([]);
    const [loading, setLoding] = useState(true);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        //database releted work
        async function fetchVideos() {
            const db = getDatabase();
            const videoRef = ref(db, 'videos');
            const videoQuery = query(
                videoRef,
                orderByKey(),
                startAt('' + page),
                limitToFirst(8)
            );

            try {
                setError(false);
                setLoding(true);

                //request firebase database
                const snapshot = await get(videoQuery);
                setLoding(false);

                if (snapshot.exists()) {
                    setVideos((preVideo) => {
                        return [...preVideo, ...Object.values(snapshot.val())];
                    });
                } else {
                    setHasMore(false);
                }
            } catch (error) {
                console.log(error);
                setError(true);
                setLoding(false);
            }
        }

        fetchVideos();
    }, [page]);

    return { loading, error, videos, hasMore };
}
