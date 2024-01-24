import React ,{useContext, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from '../hook/useSignUp';

const SignUpComponent = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup,error,isLoading}=useSignUp();
    const[success,setSuccess]=useState(false);

    const navigate = useNavigate();
    
    const handleSignupUser = (e) => {
        e.preventDefault()
        signup(username,email, password)
        .then(async res => {
            if(res.success){
                setSuccess(true)
                await new Promise((resolve) => setTimeout(resolve, 1000));
                handleSignupSuccess();
            }
        }
        )
        .catch(err=>{
            console.log(err)
        })
      };
    const handleSignupSuccess=()=>{
        navigate('/');
    }
    return (
        <div className="Sign-up mt-5">
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
                success && (<div class="alert alert-success" role="alert">Signed up successfully</div>)

            }
            <h3 className="mb-5 title">Sign Up</h3>
            <input type="text" className="mb-4" id="name" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username'></input>
            <input type="email" className="mb-4" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'></input>
            <input type="password" className="mb-4" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password'></input>
            <button className="btn-succes" onClick={handleSignupUser}>Sign Up</button>
        </div>
    )
}

export default SignUpComponent