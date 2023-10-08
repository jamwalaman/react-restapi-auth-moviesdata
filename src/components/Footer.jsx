import {Container, Row, Col} from 'react-bootstrap'

function Footer() {
    return (
        <>
        <footer>
            <Container>
                <Row>
                    <Col className='m-auto p-3'>
                        <p>MERN Stack app</p>
                        <p>
                            <a href='https://github.com/jamwalaman/react-restapi-auth-moviesdata' target='_blank' rel='noreferrer'>Click here</a> for source code for this project
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
        </>
    )
}

export default Footer
