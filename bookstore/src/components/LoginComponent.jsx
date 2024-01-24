import React, { useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../hook/useLogin';

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [success, setSuccess] = useState(false);
    const { login, error, isLoading } = useLogin();
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);


    const handleLogin = (e) => {
        e.preventDefault()
        login(email, password)
            .then(async(res) => {
                if (res.success) {
                    setSuccess(true);
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    handleLoginSuccess();
                }
            })
            .catch((err) => { console.log(err) })
    };

    const handleLoginSuccess=()=>{
        navigate('/')
    }
    return (
        <form className="login mt-5" onSubmit={handleLogin}>
            {
                error && error.length > 0 && (
                    <div>
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>{error}</strong>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                ) 
            }
            {
                success && (<div className="alert alert-success" role="alert">Login success</div>)

            }
            <h3 className="title mb-5">Login</h3>
            <input type="email" className="mb-4" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'></input>
            <input type="password" className=" mb-4" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password'></input>
            <button disabled={isLoading} className="btn-succes">Login</button>
        </form>
    )
}

export default LoginComponent


