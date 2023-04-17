import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap'
import { Context } from '../..'
import { createDevice, fetchBrands, fetchDevices, fetchTypes } from '../../http/deviceAPI'
import { observer } from 'mobx-react-lite'

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)

    useEffect(() => {
      fetchTypes().then((data) => device.setTypes(data));
      fetchBrands().then((data) => device.setBrands(data));
      fetchDevices().then((data) => device.setDevices(data.rows));
    }, []);
    const [name, setName] = useState('')
    const [info, setInfo] = useState([])
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)


    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const removeInfo = (number) => {
        const filteredInfo = info.filter(info => info.number !== number)
        setInfo([...filteredInfo])
    }

    const changeInfo = (key, value, number) => {
      setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = (e) => {
      setFile(e.target.files[0]);
    }

    const addDevice = () => {

      const formData = new FormData()

      formData.append('name', name)
      formData.append('price', `${price}`)
      formData.append('img', file)
      formData.append('brandId', device.selectedBrand.id)
      formData.append('typeId', device.selectedType.id)
      formData.append('info', JSON.stringify(info))

      createDevice(formData).then(data => onHide())
    }

    return (
        <Modal
        show={show}
        onHide={onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Добавить тип
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className='d-flex flex-column gap-2'>
             <Dropdown>
                <Dropdown.Toggle>{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                <Dropdown.Menu>
                    {device.types.map(type => 
                        <Dropdown.Item 
                            key={type.id} 
                            onClick={() => device.setSelectedType(type)} 
                        >{type.name}</Dropdown.Item>
                    )}
                </Dropdown.Menu>
             </Dropdown>
             <Dropdown >
                <Dropdown.Toggle>{device.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
                <Dropdown.Menu>
                    {device.brands.map(brand => 
                        <Dropdown.Item 
                            key={brand.id} 
                            onClick={() => device.setSelectedBrand(brand)}>
                          {brand.name} </Dropdown.Item>
                    )}
                </Dropdown.Menu>
             </Dropdown>
             <Form.Control value={name} onChange={e => setName(e.target.value)} placeholder='Введите название утройства' />
             <Form.Control value={price} onChange={e => setPrice(e.target.value)}  placeholder='Введите стоимость утройства в рублях' type='number' />
             <Form.Control type='file' onChange={selectFile} />
             <hr />
             <Button onClick={addInfo}  >Добавить новое свойство</Button>
             {info.map(i => (
                <Row key={i.number}>
                    <Col md={4}>
                        <Form.Control value={i.title} onChange={(e) => changeInfo("title", e.target.value, i.number)} placeholder='Введите название свойства' />
                    </Col>
                    <Col md={4}>
                        <Form.Control value={i.description} onChange={(e) => changeInfo("description", e.target.value, i.number)} placeholder='Введите описание свойства' />
                    </Col>
                    <Col md={4}>
                        <Button onClick={() => removeInfo(i.number)} variant={'danger'} >Удалить</Button>
                    </Col>
                </Row>
             ))}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant={'danger'} onClick={onHide}>Закрыть</Button>
            <Button  variant={'success'} onClick={addDevice}>Добавить</Button>
          </Modal.Footer>
        </Modal>
      )
})

export default CreateDevice