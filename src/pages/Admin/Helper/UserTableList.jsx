import AxiosService from "../../../utils/AxiosService"
import ApiRoutes from "../../../utils/ApiRoutes"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const UserTableList = ({id, userEmail, userName, userLastName, userRole, userVerify, createdAt}) =>{
    //Scrolls to the correct ID
    const scrollToElement = id =>  document.getElementById(id) && document.getElementById(id).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"}) 
    const navigate = useNavigate()   

    const findIndex = (array, id) =>{
        for(let i in array){
            if(array[i]._id === id)
            return i
        }
    }

    const handleEdit = async () =>{
       await navigate(`/admin/edit/${id}`)
       scrollToElement('edit')
    }

    const handleDelete = async (id, userName) =>{
        // const index = findIndex(users, id)        
        // let newArray = [...users]
        // newArray.splice(index, 1)
        // const result = confirm(`Are you sure you want to delete this '${userName}'?`);
        // if (result) {
        //     setUsers(newArray)
        //     const res = await AxiosService.delete(`${ApiRoutes.DEL_USER_BY_ID.path}${id}`, {authenticate : ApiRoutes.DEL_USER_BY_ID.authenticate})
        //     if(res.status === 200){
        //         toast.error("User Delete successfully")
        //     }
        // } 
    }
    return (
    <>
        <tr>
            <td>
                <div className="form-check form-check-muted m-0">
                    <input className="form-check-input" type="checkbox" />
                </div>
            </td>
            <td>
                {`${userName} ${userLastName}`}
                {/* <img src="assets/images/faces/face1.jpg" alt="image" /> */}
                {/* <span className="pl-2">Henry Klein</span> */}
            </td>
            <td>{userEmail}</td>
            <td className="text-center" >{userRole === "admin" 
                ? <div className="badge  border rounded-5" style={{background: "#00a2ff21", color: "aqua"}}>{userRole}</div> 
                : <div className="badge  border rounded-5" style={{background: "#ffff0020", color: "yellow"}}>{userRole}</div>}
            </td>
            <td className="text-center">{userVerify 
                ? <><div className="badge  border rounded-5 text-success" style={{background: "#00D25B1C"}}>Verified</div></>
                : <><div  className="badge border rounded-5 text-danger" style={{background: "#FC424A1C"}}>Not Verified</div></>}
            </td>
            <td>Dashboard</td>
            <td>{createdAt}</td>
            <td >
                <div style={{cursor: "pointer"}} onClick={handleEdit} className="badge bg-dark">
                    <i className="mdi text-primary mdi-pencil"></i>                   
                </div>&nbsp; &nbsp;
                <div style={{cursor: "pointer"}} onClick={()=>handleDelete(id, userName)} className="badge bg-white">
                  <i className="mdi text-dark mdi-delete"></i>    
                </div>
            </td>
        </tr>
    </>)
}

export default UserTableList