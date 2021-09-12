import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import classes from '../../styles/Signup.module.css';
import Button from './Buttton';
import Checkbox from './Checkbox';
import From from './From';
import TextInput from './TextInput';

export default function SignupForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setComfirmPassword] = useState('');
    const [agree, setAgree] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const { signUp } = useAuth();
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        //password match validation
        if (password !== confirmPassword) {
            return setError('Password does not Match!');
        }

        try {
            setError('');
            setLoading(true);
            await signUp(email, password, username);
            setLoading(false);
            history.push('/');
        } catch (error) {
            setLoading(false);
            console.log(error);
            setError('Failed to create an account');
        }
    }

    return (
        <From className={classes.signup} onSubmit={handleSubmit}>
            <TextInput
                required
                type="text"
                placeholder="Enter Your Name"
                icon="person"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextInput
                required
                type="text"
                placeholder="Enter Email"
                icon="alternate_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
                required
                type="password"
                placeholder="Enter Password"
                icon="lock"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextInput
                required
                type="password"
                placeholder="Confirm Password"
                icon="lock_clock"
                value={confirmPassword}
                onChange={(e) => setComfirmPassword(e.target.value)}
            />
            <Checkbox
                required
                text="I agree to the Terms &amp; Conditions"
                value={agree}
                onChange={(e) => setAgree(e.target.value)}
            />

            <Button disabled={loading} type="Submit">
                Submit Now
            </Button>

            {error & <p className="error">{error}</p>}

            <div className="info">
                Already have an account? <Link to="/login">Login</Link> instead.
            </div>
        </From>
    );
}
