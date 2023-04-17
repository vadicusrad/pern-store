import React, { useContext } from 'react'
import {observer} from 'mobx-react-lite'
import {Context} from '../index'
import { Card, Row } from 'react-bootstrap'

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <div className='d-flex flex-wrap' >{
            device.brands.map(brand => {
                return <Card 
                key={brand.id} 
                className='p-2 '
                onClick={() => device.setSelectedBrand(brand)}
                border={brand.id === device.selectedBrand.id ? 'primary' : 'none'}
                style={{cursor: 'pointer'}}
                >
                    {brand.name}
                </Card>
            })
            }
        </div>
    )
})

export default BrandBar