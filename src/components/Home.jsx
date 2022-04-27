import React, { useState, useEffect } from 'react';
import { Alert } from "react-bootstrap";
import CreateGoals from './CreateGoals';

const Home = () => {

  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
  }, [])

  function AlertDismissibleExample() {
    const [show, setShow] = useState(true);

    if (show) {
      return (
        <Alert variant="success" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Welcome</Alert.Heading>
          <p>
            You have logged in
          </p>
        </Alert>
      );
    }
    return;
  }


  return (
    <section className="section">
      <div className="container">
       
        <div className="row">
          <div className="col-12 myAlert">
            <AlertDismissibleExample />
          </div>
        </div>
        
        <div className="row">
          <div className="col-12">
            <div className="content mt-3 mb-0">
              <h1 className="">Create Goals</h1>
            </div>
          </div>
        </div>

        <CreateGoals />
        
      </div>
    </section>    
  )
}

export default Home