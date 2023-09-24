import {useDispatch, useSelector} from 'react-redux'
import {Alert} from 'react-bootstrap'
import {reset} from '../features/auth/authSlice'
import {Container, Row, Col} from 'react-bootstrap'

function AlertMsg() {
    const {alert} = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    return (
        <>
        {alert &&
        <Container>
            <Row className='justify-content-md-center'>
                <Col md='auto'>
                    <Alert variant='primary' onClose={() => dispatch(reset())} dismissible>{alert}</Alert>
                </Col>
            </Row>
        </Container>
        }
        </>
    )

  }

export default AlertMsg
