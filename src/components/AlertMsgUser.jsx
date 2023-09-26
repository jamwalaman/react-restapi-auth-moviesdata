import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Container, Row, Col, Alert} from 'react-bootstrap'
import {reset} from '../features/auth/authSlice'

function AlertMsgUser() {
    const {alertMsg} = useSelector((state) => state.auth)
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (alertMsg) {
            setShow(true)
        }
    }, [alertMsg])
    // This useEffect will run whenever `show` or `alertMsg` changes
    useEffect(() => {
    }, [show, alertMsg])

    const closeAlert = () =>{
        setShow(false)
        dispatch(reset())
    }

    return (
        <>
        {alertMsg && show &&
        <Container>
            <Row className='justify-content-md-center'>
                <Col md='auto'>
                    <Alert variant='primary' onClose={closeAlert} dismissible>{alertMsg}</Alert>
                </Col>
            </Row>
        </Container>
        }
        </>
    )

  }

export default AlertMsgUser
