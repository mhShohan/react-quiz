import defImage from '../../../assets/images/success.png';
// import useFetch from '../../../hooks/useFetch';
import classes from '../../styles/Result.module.css';

export default function Result({ score, noq }) {
    // function getKeaword() {
    //     if ((score / (noq * 5)) * 100 < 50) {
    //         return 'failed';
    //     } else if ((score / (noq * 5)) * 100 < 75) {
    //         return 'good';
    //     } else if ((score / (noq * 5)) * 100 < 100) {
    //         return 'very good';
    //     } else {
    //         return 'excellent';
    //     }
    // }
    // const url = `https://api.pexels.com/v1/search?query=${getKeaword()}&per_page=1`;
    // const { loading, error, result } = useFetch(url, 'GET', {
    //     Authorization: process.env.RACT_APP_PEXELS_API_KEY,
    // });

    // const image = result ? result?.photos[0].src.medium : defImage;

    return (
        <div className={classes.summary}>
            <div className={classes.point}>
                {/* progress bar will be placed here */}
                <p className={classes.score}>
                    Your score is <br />
                    {score} out of {noq * 5}
                </p>
            </div>

            {/* {loading && <div className={classes.badge}>Loading...</div>}
            {error && <div className={classes.badge}>Have An Error!!</div>}

            {!loading && !error && ( */}
            <div className={classes.badge}>
                <img src={defImage} alt="Success" />
            </div>
            {/* )} */}
        </div>
    );
}
