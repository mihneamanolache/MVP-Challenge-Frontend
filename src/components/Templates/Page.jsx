import React from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import LoadingScreen from 'react-loading-screen'

export default function Page(props) {
  return (
    <>
        <Navbar />
        <LoadingScreen
          loading={props.loading}
          bgColor='#f1f1f1'
          spinnerColor='#9ee5f8'
          textColor='#676767'
        > 
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
        </LoadingScreen>
    </>
  )
}
