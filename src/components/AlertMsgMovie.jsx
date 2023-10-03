import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Container, Row, Col, Alert} from 'react-bootstrap'
import {resetAlert} from '../features/movies/movieSlice'

function AlertMsgMovie() {
    const {alertMsg} = useSelector((state) => state.movies)
    const dispatch = useDispatch()
    const closeAlert = () => {dispatch(resetAlert())}

    useEffect(() => {
        if (alertMsg) {
          const timeoutId = setTimeout(() => {closeAlert()}, 5000)
          return () => clearTimeout(timeoutId)
        }
      })

    return (
        <>
        {alertMsg &&
        <Container>
            <Row className='justify-content-md-center alertMsg'>
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
