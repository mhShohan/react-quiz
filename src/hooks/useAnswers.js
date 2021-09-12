import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

export default function useQuestions(videoID) {
    const [answers, setAnswers] = useState([]);
    const [loading, setLoding] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        //database releted work
        async function fetchAnswers() {
            const db = getDatabase();
            const answeresRef = ref(db, `answers/${videoID}/questions`);
            const answeresQuery = query(answeresRef, orderByKey());

            try {
                setError(false);
                setLoding(true);

                //request firebase database
                const snapshot = await get(answeresQuery);
                setLoding(false);

                if (snapshot.exists()) {
                    setAnswers((preV) => {
                        return [...preV, ...Object.values(snapshot.val())];
                    });
                }
            } catch (error) {
                console.log(error);
                setError(true);
                setLoding(false);
            }
        }

        fetchAnswers();
    }, [videoID]);

    return { loading, error, answers };
}
