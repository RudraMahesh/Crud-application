import React from 'react'
import Header from '../Components/Header'
import { Link, useParams } from 'react-router-dom'
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';

const View = () => {
    const { id } = useParams()
    const [data, setData] = useState({})

    const getApi = async () => {
        let item = await axios.get("http://localhost:3001/datas/" + id);
        setData(item.data)
    }

    useEffect(() => {
        getApi()
    }, [])
    return (
        <>
            <Header />
            <div className='fw-bold container mt-4 mt-lg-5'>
                <h2>View Component</h2><br />
                <input type="text" className="form-control mb-3 border-4" value={data.name} />
                <input type="text" className="form-control mb-3 border-4" value={data.email} />
                <input type="text" className="form-control mb-3 border-4" value={data.phone} />
                <textarea type="text" className="form-control mb-3 border-4" value={data.address}></textarea>
                <Link to="/"><button className='btn btn-secondary px-4' >Go Back</button></Link>
            </div>
        </>
    )
}

export default View