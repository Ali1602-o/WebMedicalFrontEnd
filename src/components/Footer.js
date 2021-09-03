import React from 'react'; 
import {Navbar, Container, Col} from 'react-bootstrap'; 

class Footer extends React.Component { 
    render() { 
        let fullYear = new Date().getFullYear();
        return ( 
            
            <Navbar fixed="bottom" bg="white" variant="light">
                <Container>
                    <Col lg={12} className="text-center text-muted">
                        <div>{fullYear}-{fullYear+1}, All Rights Reserved by Web Medical</div> 
                    </Col>
                </Container>
            </Navbar>); 
    }
}
export default Footer;