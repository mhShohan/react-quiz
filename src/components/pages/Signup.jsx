import image from '../../assets/images/signup.svg';
import Illustration from './page_components/Illustration';
import SignupForm from './page_components/SignupoForm';

export default function Signup() {
    return (
        <>
            <h1>Create an account</h1>
            <div className="column">
                <Illustration image={image} />
                <SignupForm />
            </div>
        </>
    );
}
