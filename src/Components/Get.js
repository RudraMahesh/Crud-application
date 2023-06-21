import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

const Get = () => {
    // We can also use api instead of json file
    const [data, setData] = useState([])
    const navigate = useNavigate()

    // Delete Method
    async function deleteData(id) {
        const confirmDelete = window.confirm("Are You Sure because This Data Delete permanently")
        if (confirmDelete) {
            let item = axios.delete("http://localhost:3001/datas/" + id)
            console.log(item);
            setData(prev => prev.filter(item => item.id !== id))
        }
    }
    const api = async () => {
        let item = await axios.get("http://localhost:3001/datas")
        setData(item.data)
    }

    // view method
    function viewData(id) {
        navigate('/view/' + id);
    }

    // Edit method
    function editData(id) {
        navigate('/edit/' + id);
    }

    useEffect(() => {
        api()
    }, [])
    return (
        <div className='container'>
            <Link to="/create"><button className='btn btn-dark mt-3 mt-lg-4 mb-3 px-4'>Create New</button></Link>
            <table className='table table-hover border-2 text-center'>
                <thead>
                    <tr className='fw-bold fs-3'>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Phone</td>
                        <td>Address</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.map((item, id) =>
                            <tr key={id} className=''>
                                <td>{id + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.address}</td>
                                <td>
                                    <>
                                        <button className='btn btn-success me-3' onClick={() => viewData(item.id)}>View</button>
                                        <button className='btn btn-secondary me-3' onClick={() => editData(item.id)}>Edit</button>
                                        <button className='btn btn-danger' onClick={() => deleteData(item.id)}>Delete</button>
                                    </>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Get