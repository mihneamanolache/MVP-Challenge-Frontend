export default function Navbar() {
    return (
        <>
            <nav className="navbar navbar-white border-bottom border-light border-5 bg-white ms-3 p-2">
                <div className="container-fluid">
                    <div>
                        <img src="/navbarLogo.svg" alt="MVP Logo"/>
                        <img src="/menuButton.svg" alt="Menu" className="ms-5"/>
                    </div>
                    <div className="d-flex me-5 sjustify-content-center align-items-center">
                        <div className="fs-5 p-2 fw-700 bg-yellow text-white rounded-more me-2 text-center fs-23 username-rectangle">
                            JD
                        </div>
                        <span className="text-blue-600 fw-700">John Doe</span>
                    </div>
                </div>
            </nav>  
        </>
    )
}