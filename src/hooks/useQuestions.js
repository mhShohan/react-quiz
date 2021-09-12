import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

export default function useQuestions(videoID) {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoding] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        //database releted work
        async function fetchQuestions() {
            const db = getDatabase();
            const quizRef = ref(db, `quiz/${videoID}/questions`);
            const quizQuery = query(quizRef, orderByKey());

            try {
                setError(false);
                setLoding(true);

                //request firebase database
                const snapshot = await get(quizQuery);
                setLoding(false);

                if (snapshot.exists()) {
                    setQuestions((preV) => {
                        return [...preV, ...Object.values(snapshot.val())];
                    });
                }
            } catch (error) {
                console.log(error);
                setError(true);
                setLoding(false);
            }
        }

        fetchQuestions();
    }, [videoID]);

    return { loading, error, questions };
}
