import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { AiOutlineStar } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/deviceAPI';

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
  }, []);

  return (
    <Container className='mt-5'>
      <Row>
        <Col md={4} className='d-flex justify-content-center'>
          <Image
            src={process.env.REACT_APP_API_URL + device.img}
            width={300}
            height={300}
          />
        </Col>
        <Col md={4} className='d-flex align-items-center flex-column'>
          <h2>{device.name}</h2>
          <div className='d-flex justify-content-center align-items-center position-relative'>
            <div>
              <AiOutlineStar size={100} />
            </div>

            <h2 className='position-absolute top-50 start-50 translate-middle'>
              {device.rating}
            </h2>
          </div>
        </Col>
        <Col md={4}>
          <Card
            className='d-flex flex-column align-items-center justify-content-around'
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: '2px solid lightgray',
            }}
          >
            <h3>От: {device.price} руб.</h3>
            <Button>Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
      <Row className='mt-5'>
        <h2 className='mb-4'>Характеристики</h2>
        {device.info.map((info, index) => {
          return (
            <Row
              key={info.id}
              style={{
                background: index % 2 === 0 ? 'lightgray' : 'transparent',
                padding: '10px',
              }}
            >
              {info.title} : {info.description}
            </Row>
          );
        })}
      </Row>
    </Container>
  );
};

export default DevicePage;
