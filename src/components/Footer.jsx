import React from 'react'

const Footer = () => {

    const today = new Date()


    return (
        <footer className='py-2'>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <p>Chima Ifeanyi &copy; {today.getFullYear()}</p>
                        <p>Credits: Dave Gray, Brad Traversy</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer