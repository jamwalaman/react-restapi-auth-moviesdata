import {Container, Row, Col, Spinner} from 'react-bootstrap'

function SpinnerLoading() {
    return (
        <Container className='text-center'>
            <Row className='justify-content-md-center'>
                <Col md='auto'>
                    <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>
                </Col>
            </Row>
        </Container>
    )
}

export default SpinnerLoading;
