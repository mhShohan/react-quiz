import classes from '../../styles/Result.module.css';
import Question from './Question';

export default function Result({ answers }) {
    return (
        <div className={classes.analysis}>
            <h1>Question Analysis</h1>
            <Question answers={answers} />
        </div>
    );
}
