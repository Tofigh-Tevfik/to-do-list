import { FC, useState, ChangeEvent, FormEvent, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../Store/store';
import { IUser } from '../Store/reduxInterface';
import UserLogin from './UserLogin';
import AdminLogin from './AdminLogin';


const Login: FC = () => {
    const usernameRef = useRef<any>();

    const [users, setUsers] = useState<IUser[]>([]);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [role, setRole] = useState<string>('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (users.map((user) => {return user.username}).includes(username)) {
            if (users[users.map((user) => {return user.username}).indexOf(username)].password === password) {
                setSuccess(true);
                console.log(true)
                if (users[users.map((user) => {return user.username}).indexOf(username)].role === 'user') {
                    setRole('user');
                } 
                else if (users[users.map((user) => {return user.username}).indexOf(username)].role === 'admin') {
                    setRole('admin');
                }
            }
        else {
            setSuccess(false);
            console.log("wrong password");
        }
        }
        else {
            setSuccess(false);
            console.log("No such user");
        }
    }

    useEffect(() => {
        usernameRef.current.focus();
    }, [])

    useEffect(() => {
        updateState();
        store.subscribe(updateState);
    }, [])

    const updateState = () => {
        const state = store.getState();
        setUsers(state.users);
        console.log(state);
    }

    return(
        <>
            {success ? 
                (
                    (role === 'user' ?
                    <UserLogin username={username}/> : <AdminLogin />)
                ) :
                (
                    <section>
                        <h1>Log In</h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="username">Username</label>
                            <input 
                                id="username"
                                type="text"
                                autoComplete="off"
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {setUsername(event.target.value)}}
                                ref={usernameRef}
                            />

                            <label htmlFor="password">Password</label>
                            <input 
                                id="password"
                                type="password"
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {setPassword(event.target.value)}}
                            />

                            <button disabled={username !== '' && password !== '' ? false : true}>Log In</button>
                        </form>
                        <p style={{textAlign: "center"}}>
                            Not Registered?<br />
                            <Link to="/register">Sign Up</Link>
                        </p>

                    </section>
                )     
            }
        </>
    ); 
}

export default Login;