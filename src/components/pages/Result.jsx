import _ from 'lodash';
import { useHistory, useParams } from 'react-router-dom';
import useAnswers from '../../hooks/useAnswers';
import Analysis from './page_components/Analysis';
import Summary from './page_components/Summary';

export default function Result() {
    const { id } = useParams();
    const { location } = useHistory();
    const { state } = location;
    const { qna } = state;
    const { loading, error, answers } = useAnswers(id);

    function calculateResult() {
        let score = 0;

        answers.forEach((question, index1) => {
            let correctIndexes = [];
            let checkedIndexes = [];

            question.options.forEach((option, index2) => {
                if (option.correct) correctIndexes.push(index2);
                if (qna[index1].options[index2].checked) {
                    checkedIndexes.push(index2);
                    option.checked = true;
                }
            });

            if (_.isEqual(correctIndexes, checkedIndexes)) {
                score = score + 5;
            }
        });

        return score;
    }

    const userScore = calculateResult();

    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>Have an Error...</div>}
            {answers && answers.length > 0 && (
                <>
                    <Summary score={userScore} noq={answers.length} />
                    <Analysis answers={answers} />
                </>
            )}
        </>
    );
}
