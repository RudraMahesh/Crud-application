import React, { useState } from 'react'
import Header from '../Components/Header'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

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

    async function handleSubmit(e) {
        e.preventDefault()
        let item = { name, email, phone, address }
        // console.log(name, email, phone, address);
        if (validateForm()) {
            let data = await axios.post("http://localhost:3001/datas/", item)
            // console.log(data);
            console.log("Created Successfull")
            navigate("/")
        }
    }
    return (
        <div>
            <Header />
            <div className='container mt-4 mt-lg-5'>
                <h2>Create New User</h2>
                <form className='mt-5' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <span className='fw-bold'>Enter Your Name*</span>
                        <input type='text' className='form-control w-100 mt-2 border-4' placeholder='Your Name' onChange={(e) => setName(e.target.value)} />
                        {errors.name && (
                            <span className="text-danger fw-bold">{errors.name}</span>
                        )}
                    </div>
                    <div className='mb-3'>
                        <span className='fw-bold'>Enter Your Email*</span>
                        <input type='text' className='form-control w-100 mt-2 border-4' placeholder='Your Email' onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && (
                            <span className="text-danger fw-bold">{errors.email}</span>
                        )}
                    </div>
                    <div className='mb-3'>
                        <span className='fw-bold'>Enter Your Phone Number*</span>
                        <input type='text' className='form-control w-100 mt-2 border-4' placeholder='Your Phone' onChange={(e) => setPhone(e.target.value)} />
                        {errors.phone && (
                            <span className="text-danger fw-bold">{errors.phone}</span>
                        )}
                    </div>
                    <div className='mb-3'>
                        <span className='fw-bold'>Enter Your Address*</span>
                        <textarea type='text' className='form-control w-100 mt-2 border-4' placeholder='Your Address' onChange={(e) => setAddress(e.target.value)}></textarea>
                        {errors.address && (
                            <span className="text-danger fw-bold">{errors.address}</span>
                        )}
                    </div>
                    <input type='submit' value="Create" className='btn btn-dark px-4' />
                </form>
            </div>
        </div>
    )
}

export default Create