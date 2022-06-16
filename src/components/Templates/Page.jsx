import React from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'

export default function Page(props) {
  return (
    <>
        <Navbar />
        <div className="d-flex">
            <Sidebar />
            <div className="main-content vh-100 p-4">
                { props.children }
                <div>
                  <a className="text-blue-600 fw-bolder text-decoration-none terms-and-conditions p-4" href='#'>
                    Terms&Conditions | Privacy policy
                  </a>
                </div>
            </div>
        </div>  
    </>
  )
}
