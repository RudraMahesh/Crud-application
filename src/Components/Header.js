import React from 'react'
import logo from "../images/logo.png"
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/">
                        <span className="navbar-brand" href="">
                            <img src={logo} class="img-fluid rounded-top w-50" alt="" />
                        </span>
                    </Link>
                    <a href="mailto:maheshwariprince748@gmail.com?subject=Crud Feedback" className='text-light'>Send Feedback</a>
                </div>
            </nav>

        </div>
    )
}

export default Header