import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import classes from '../../styles/Signup.module.css';
import Button from './Buttton';
import Form from './From';
import TextInput from './TextInput';

export default function LoginForm() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const { login } = useAuth();
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(email, password);
            setLoading(false);
            history.push('/');
        } catch (error) {
            setLoading(false);
            console.log(error);
            setError('Failed to Login');
        }
    }

    return (
        <Form className={classes.login} onSubmit={handleSubmit}>
            <TextInput
                type="text"
                placeholder="Enter Email"
                icon="alternate_email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
                type="password"
                placeholder="Enter Password"
                icon="lock"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="Submit" disabled={loading}>
                Login
            </Button>

            {error & <p className="error">{error}</p>}

            <div className="info">
                Don't have an account? <Link to="/signup">Signup</Link> instead.
            </div>
        </Form>
    );
}
