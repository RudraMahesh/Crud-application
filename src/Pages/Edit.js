import React from 'react'
import Header from '../Components/Header'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';

const Edit = () => {
    const { id } = useParams()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    const getApi = async () => {
        let item = await axios.get("http://localhost:3001/datas/" + id);
        setName(item.data.name)
        setEmail(item.data.email)
        setPhone(item.data.phone)
        setAddress(item.data.address)
    }
    const validateForm = () => {
        let errors = {};

        if (!name.trim()) {
            errors.name = 'Please enter your name';
        } else if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
            errors.name = 'Please enter a valid name';
        }

        if (!email.trim()) {
            errors.email = 'Please enter your email';
        } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
            errors.email = 'Please enter a valid email';
        }

        if (!phone.trim()) {
            errors.phone = 'Please enter your phone number';
        } else if (!/((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/.test(phone.trim())) {
            errors.phone = 'Please enter a valid phone number';
        }

        if (!address.trim()) {
            errors.address = 'Please enter your address';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const edit = async (e) => {
        e.preventDefault()
        if (validateForm()) {
            let item = await axios.put("http://localhost:3001/datas/" + id, {
                name: name,
                email: email,
                phone: phone,
                address: address
            })
            // console.log(item);
            navigate("/")
        }
    }
    useEffect(() => {
        getApi()
    }, [])
    return (
        <>
            <Header />
            <div className='fw-bold container mt-4 mt-lg-5'>
                <h2>Edit Component</h2><br />
                <form onSubmit={edit}>
                    <div className='mb-3'>
                        <input type="text" className="form-control border-4" value={name} onChange={(e) => setName(e.target.value)} />
                        {errors.name && (
                            <span className="text-danger fw-bold">{errors.name}</span>
                        )}
                    </div>

                    <div className='mb-3'>
                        <input type="text" className="form-control border-4" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && (
                            <span className="text-danger fw-bold">{errors.email}</span>
                        )}
                    </div>

                    <div className='mb-3'>
                        <input type="text" className="form-control border-4" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        {errors.phone && (
                            <span className="text-danger fw-bold">{errors.phone}</span>
                        )}
                    </div>

                    <div className='mb-3'>
                        <textarea type="text" className="form-control border-4" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                        {errors.address && (
                            <span className="text-danger fw-bold">{errors.address}</span>
                        )}
                    </div>
                    <input type='submit' className='btn btn-dark px-4' value="Edit" />
                </form>
            </div>
        </>
    )
}

export default Edit