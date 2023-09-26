import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Container, Row, Col, Alert} from 'react-bootstrap'
import {reset} from '../features/movies/movieSlice'

function AlertMsgMovie() {
    const {alertMsg} = useSelector((state) => state.movies)
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (alertMsg) {
            setShow(true)
            const timeoutId = setTimeout(() => {
                setShow(false)
                dispatch(reset())
            }, 3000)
            return () => clearTimeout(timeoutId)
        }
    }, [alertMsg, dispatch])
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

export default AlertMsgMovie
