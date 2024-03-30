import React, {useEffect, useState} from 'react'
import AxiosService from "../../../utils/AxiosService"
import ApiRoutes from '../../../utils/ApiRoutes'
import UserTableList from '../Helper/UserTableList'
import ScrollContainer from 'react-indiana-drag-scroll';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../Redux/AdminActions/AdminActions';
import Loading from "../../../animation/Loading"

const UserTable = () => {
    const dispatch = useDispatch()
    const {users, loading} = useSelector(state => state.usersState)
    const location = useLocation()
    const dateModle = (dateString) =>{
      const dateConvert = new Date(dateString);
      let d = dateConvert.toDateString().split(" ")
      return `${d[2]} ${d[1]} ${d[3]}`
      }
    const [user, setUsers] = useState([])
    const getAllUser = async ()=>{
        try {
            const res = await AxiosService.get(ApiRoutes.USER_BY_ID.path)
            setUsers(res.data.users)
        } catch (error) {
            console.log(error)
           toast.error(error.response.data.message || error.message)   
        }
    }

    useEffect(()=>{
        dispatch(getAllUsers)
        // getAllUser()
    },[location.pathname === "/admin"])
  return (
    <>    
    {loading && <Loading/>}
<div className="row">
    <div className="col grid-margin">
        <div className="card" style={{background : "#212529"}}>
            <div className="card-body">
                <h4 className="card-title">All User List</h4>
                <div className="table-responsive">
                    <ScrollContainer horizontal className="scroll-container">
                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th>
                                        <div className="form-check form-check-muted m-0">
                                            <input className="form-check-input" type="checkbox" />
                                        </div>
                                    </th>
                                    <th>Client Name</th>
                                    <th className='text-center'>Email</th>
                                    <th className='text-center'>Role</th>
                                    <th>Verified status</th>
                                    <th>Payment Mode</th>
                                    <th>Start Date</th>
                                    <th className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>                           
                                {
                                  users &&  users.map((data, index)=>{
                                        return <UserTableList key={index}  users={users} setUsers={setUsers} id={data._id} userName={data.name} userLastName={data.lastName} userEmail={data.email} userRole={data.role} userVerify={data.verified} createdAt={dateModle(data.createdAt)} />
                                    })
                                }
                            </tbody>
                        </table>
                    </ScrollContainer>
                </div>
            </div>
        </div>
    </div>
    <Outlet/>
</div>
    </>          
  )
}

export default UserTable