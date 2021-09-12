import image from '../../assets/images/login.svg';
import Illustration from './page_components/Illustration';
import LoginForm from './page_components/LoginForm';

export default function Login() {
    return (
        <>
            <h1>Login to your account</h1>
            <div className="column">
                <Illustration image={image} />
                <LoginForm />
            </div>
        </>
    );
}
