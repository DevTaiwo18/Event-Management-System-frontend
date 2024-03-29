import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Four4page = () => {

    return (
        <div>
            <Card className='showmEventm pb-5'>
                <Card.Body>
                    <Card.Img variant="top" src="/404.jpg" className='shownOdataimg pt-4' />
                    <Card.Title>404 - Page Not Found</Card.Title>
                    <Card.Text className='mb-3'>
                        The page you are looking for does not exist.
                    </Card.Text>
                    <Link to="/" className="btnShow">Back To Home</Link>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Four4page;
