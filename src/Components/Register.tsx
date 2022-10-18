import { FC, useRef, useState, useEffect, ChangeEvent,  FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../Store/actions/actions';
import { store } from '../Store/store';

const UserRegex: RegExp = /^[A-z][A-z0-9-_]{3,20}$/;
const PasswordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/;

const Register: FC = () => {
    const userRef = useRef<any>();

    const [username, setUsername] = useState<string>('');
    const [validUsername, setValidUsername] = useState<boolean>(false);

    const [password, setPassword] = useState<string>('');
    const [validPassword, setValidPassword] = useState<boolean>(false);

    const [matchPassword, setMatchPassword] = useState<string>('');
    const [validMatch, setValidMatch] = useState<boolean>(false)

    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        updateState();
        store.subscribe(updateState);
    }, [])

    const updateState = () => {
        const state = store.getState();
        console.log(state);
    }

    useEffect((): void => {
        userRef.current.focus();
    }, [])

    useEffect((): void => {
        const userValid: boolean = UserRegex.test(username)
        setValidUsername(userValid);
    }, [username])

    useEffect((): void => {
        setValidPassword(PasswordRegex.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSuccess(true);
        store.dispatch(register({ username: username, password: password, role: 'user' }))
    }

    return(
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <Link to="/login">Sign In</Link>
                    </p>
                </section>
            ) : (
            <section>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input 
                        id="username"
                        type="text"
                        onChange={(event : ChangeEvent<HTMLInputElement>): void => setUsername(event.target.value)}
                        required
                        autoComplete="off"
                        aria-describedby="username-instructions"
                        aria-invalid={validUsername ? "false" : "true"}
                        ref={userRef}
                        style={validUsername ? {backgroundColor: "rgb(142, 211, 142)"} : {backgroundColor: "white"}}
                    />
                    <p id="username-instructions" className={username !== "" && !validUsername ? "instructions" : "offscreen"}>
                        At Least 4 Characters.<br />
                        Must Begin With a Letter. <br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                    <label htmlFor="password">Password</label>
                    <input 
                        id="password"
                        type="password"
                        onChange={(event : ChangeEvent<HTMLInputElement>): void => setPassword(event.target.value)}
                        required
                        style={validPassword ? {backgroundColor: "rgb(142, 211, 142)"} : {backgroundColor: "white"}}
                    />
                    <p className={password !== "" && !validPassword ? "instructions" : "offscreen"}>
                        At Least 8 Characters.<br />
                        Uppercase and lowercase letters, a number and a special character must be included.<br />
                        Allowed special characters: !@#$%
                    </p>
                    <label htmlFor="match-password">Confirm Password</label>
                    <input 
                        id="match-password"
                        type="password"
                        onChange={(event: ChangeEvent<HTMLInputElement>): void => setMatchPassword(event.target.value)}
                        required
                        style={password !== "" && validMatch ? {backgroundColor: "rgb(142, 211, 142)"} : {backgroundColor: "white"}}
                    />
                    <p className={matchPassword !== "" && password !== "" && !validMatch ? "instructions" : "offscreen"}>
                        Must match the first password input field.
                    </p>
                    <button disabled={!validUsername || !validPassword || !validMatch ? true : false}>Sign Up</button>
                </form>
                <p style={{textAlign: "center"}}>Already Registere?<br />
                <span className="line">
                    <Link to="/login">Sign In</Link>
                </span>
                </p>
            </section> )}
        </>
    );
}

export default Register;