import { db, doc, getDoc } from '../../Config/Firebase'
import { useState } from 'react'
import { useHistory } from 'react-router';
import './Style/index.css'
function Login() {
    const auth = sessionStorage.getItem("auth");
    console.log(auth)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory()
    const login = async () => {
        setLoading(true)
        const docRef = doc(db, "web-admin", "id-password");
        const docSnap = await getDoc(docRef);
        const loginDetail = docSnap.data()

        if (loginDetail.userName === email && loginDetail.password === password) {
            console.log('tr')
            sessionStorage.setItem("auth", true);
            setLoading(false)

            history.push('/dashboard')
        }
        else {
            setLoading(false)
            alert('detail incorrect')
        }
    }

    return (
        <>
            <div className='header'>
                <h1>login</h1>
            </div>
            <div className='body_container'>
                <div className='login_container'>
                    <label>User Name:</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type='text' required />

                    <label>Password:</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' required />

                    <button onClick={login}>{loading ? 'loading...' : 'login'} </button>
                </div>
            </div>
        </>
    )

}

export default Login;