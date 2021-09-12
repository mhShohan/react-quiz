import classes from '../../styles/Signup.module.css';

export default function From({ children, className, ...rest }) {
    return (
        <form className={`${className} ${classes.form}`} {...rest}>
            {children}
        </form>
    );
}
