import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { AiOutlineStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/routeConstants';

const DeviceItem = ({ device }) => {
  const navigate = useNavigate();

  return (
    <Col
      className='mt-3'
      md={3}
      onClick={() => navigate(`${DEVICE_ROUTE}/${device.id}`)}
    >
      <Card style={{ width: 150, cursor: 'pointer' }} border={'ligth'}>
        <Image
          src={process.env.REACT_APP_API_URL + device.img}
          width={146}
          height={160}
        />
        <div className='d-flex justify-content-between align-items-center mt-2 '>
          <div className='text-black-50'>Samsung</div>
          <div className='d-flex align-items-center'>
            <div>{device.rating}</div>
            <AiOutlineStar size={20} />
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
