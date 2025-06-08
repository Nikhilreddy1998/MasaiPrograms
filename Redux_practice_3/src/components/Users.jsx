import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "../features/usersSlice"



function Users(){
    // Access data from redux store
    const {data,loading,error}=useSelector(state=>state.users)
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(fetchUsers())
    },[dispatch])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error:{error}</p>
    return <ul>
        {data.map(user=>(
            <li key={user.id}>{user.name}</li>
        ))}
    </ul>
}

export default Users