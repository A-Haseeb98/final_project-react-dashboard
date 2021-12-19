import { useHistory } from "react-router";
import { useState } from "react/cjs/react.development";
import { collection, query, where, getDocs, db, doc, updateDoc } from '../../Config/Firebase'
import './Style/index.css'
import LOGO from '../../Assets/logo.png'
import ManagerTab from "../manager_tab";
function Dashboard() {

    const [approvedData, setApprovedData] = useState('')
    const [pendingData, setpendingData] = useState('')
    const [tab, setTab] = useState('')
   
    const history = useHistory();
    const auth = sessionStorage.getItem("auth")
    if (!auth) {
        history.push('/')
    }

    const logOut = () => {
        sessionStorage.setItem("auth", false);
        history.push('/')
    }

    const pendingRequest = async () => {
        setApprovedData('')
        setTab('pending')

        const arr = [];
        const q = query(collection(db, "users"), where("status", "==", "pending"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            arr.push(doc.data());
        });
        setpendingData(arr)
    }

    const ApprovedOrRejectedRequest = async () => {
        setTab('approved')
        setpendingData('')
        const arr = [];
        const q = query(collection(db, "users"), where("status", "==", "Approved"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            arr.push(doc.data());
        });
        const qu = query(collection(db, "users"), where("status", "==", "Rejected"));
        const querySnapshot1 = await getDocs(qu);
        querySnapshot1.forEach((doc) => {
            arr.push(doc.data());
        });
        setApprovedData(arr)
    }

    const branchManager = () => {
        setApprovedData('')
        setpendingData('')
        setTab('manager')

    }

    const changeStatus = async (id, status) => {
        console.log(status,'ss')
        const update = doc(db, "users", id);

        // Set the "capital" field of the city 'DC'
        await updateDoc(update, {
            status: status
        });
        pendingRequest()
    }

    return (
        <>
            <div className='dashboard_heading'>
                <img className='logo_img' src={LOGO} alt='logo' />
                <h1>DASHBOARD</h1>
                <button onClick={logOut} className='logout'>LOGOUT </button>
            </div>
            <div className='tabs_menu'>
                <div className='pending' onClick={pendingRequest} >
                    PENDING REQUEST
                </div>
                <div className='approved' onClick={ApprovedOrRejectedRequest}>
                    APPROVED OR REJECTED REQUEST
                </div>
                <div className='manager' onClick={branchManager} >
                    BRANCH MANAGER
                </div>
            </div>

            <div>
                {tab == 'manager' ?
                    <ManagerTab />
                    :
                    null
                }
                {pendingData ?
                    pendingData.map((v, i) => {
                        console.log(v, 'v')
                        return <div className='list_container' key={i}>
                            <ul className='list'>
                                <li>Status: {v.status}</li>
                                <li>CNIC: {v.cnic}</li>
                                <li>Email: {v.email}</li>
                                <li>Id: {v.uid}</li>
                                <li>No of Family Member: {v.familyMember}  </li>
                                <li>Name: {v.name} </li>
                                <li>Father Name: {v.fatherName} </li>
                                <li>DOB: {v.dob}</li>
                            </ul>
                            <button onClick={() => changeStatus(v.uid, 'Approved')} >Approve </button>
                            <button onClick={() => changeStatus(v.uid, 'Rejected')} >Reject </button>
                        
                        </div>
                    })
                    :
                    null
                }
                {approvedData ?

                    approvedData.map((v, i) => {
                        console.log(v, 'v')
                        return <div className='list_container' key={i}>
                            <ul className='list'>
                                <li>Status: {v.status}</li>
                                <li>CNIC: {v.cnic}</li>
                                <li>Email: {v.email}</li>
                                <li>Id: {v.uid}</li>
                                <li>No of Family Member: {v.familyMember}  </li>
                                <li>Name: {v.name} </li>
                                <li>Father Name: {v.fatherName} </li>
                                <li>DOB: {v.dob}</li>
                            </ul>
                        </div>
                    })
                    :
                    null
                }
            </div>
        </>
    )
}

export default Dashboard;