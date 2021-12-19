import { db, doc, setDoc } from '../../Config/Firebase'
import { useState } from 'react'

function ManagerTab() {
    const auth = sessionStorage.getItem("auth");
    console.log(auth)

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");
    const [managerName, setManagerName] = useState("")
    const [branchName, setBranchName] = useState("")

    const [loading, setLoading] = useState(false);

  

    const CreateAccount = async () => {
        setLoading(true)
        const data = {
            userName,
            password,
            lat,
            lon,
            managerName,
            branchName
        }
        console.log(data)
        let dbRef = doc(db, "branch_manager", lat + lon);
        await setDoc(dbRef, data)
            .then(() => {
                alert('managerCreated')
                setLoading(false)
                setUserName('')
                setPassword('')
                setLat('')
                setLon('')
                setManagerName('')
                setBranchName('')
            })
    }

    return (
        <>


            <div className=''>
                <div className='login_container'>
                    <h1>Create Branch</h1>

                    <label>UserName:</label>
                    <input onChange={(e) => setUserName(e.target.value)} value={userName} type='text' required />

                    <label>Password:</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type='text' required />

                    <label>Latitude:</label>
                    <input onChange={(e) => setLat(e.target.value)} value={lat} type='text' required />

                    <label>Longitude:</label>
                    <input onChange={(e) => setLon(e.target.value)} value={lon} type='text' required />

                    <label>Branch Name:</label>
                    <input onChange={(e) => setBranchName(e.target.value)} value={branchName} type='text' required />

                    <label>Manager Name:</label>
                    <input onChange={(e) => setManagerName(e.target.value)} value={managerName} type='text' required />

                    <button onClick={CreateAccount}>{loading ? 'loading...' : 'Create Branch'} </button>
                </div>

                <div className='login_container'>
                    <h1>Reset Password</h1>


                    <label>Enter Branch Name:</label>
                    <input onChange={(e) => setBranchName(e.target.value)} value={branchName} type='text' required />

                    <label>Enter New UserName:</label>
                    <input onChange={(e) => setUserName(e.target.value)} value={userName} type='text' required />

                    <label>Enter New Password:</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type='text' required />

                    <button onClick={CreateAccount}>{loading ? 'loading...' : 'Update'} </button>
                </div>
            </div>
        </>
    )

}

export default ManagerTab;