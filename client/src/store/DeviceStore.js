import {makeAutoObservable} from 'mobx'

export default class DeviceStore {
    constructor() {
        this._types = [
            {id: 1, name: 'Холодильники'},
            {id: 2, name: 'Телефоны'},
        ]

        this._brands = [
            {id: 1, name: 'Samsung'},
            {id: 2, name: 'Apple'},
        ]

        this._devices = [
            {id: 1, name: 'IPhone30', price: 2500, rating: 5, img: 'https://guide-images.cdn.ifixit.com/igi/o4OjCNmNeOhvsS1P.large'},
            {id: 2, name: 'IPhone30', price: 2500, rating: 5, img: 'https://guide-images.cdn.ifixit.com/igi/o4OjCNmNeOhvsS1P.large'},
            {id: 3, name: 'IPhone30', price: 2500, rating: 5, img: 'https://guide-images.cdn.ifixit.com/igi/o4OjCNmNeOhvsS1P.large'},
            {id: 4, name: 'IPhone30', price: 2500, rating: 5, img: 'https://guide-images.cdn.ifixit.com/igi/o4OjCNmNeOhvsS1P.large'},
        ]

        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }

    setBrands(brands) {
        this._brands = brands
    }

    setDevices(devices) {
        this._devices = devices
    }

    get types() {
        return this._types
    }

    get brands() {
        return this._brands
    }

    get devices() {
        return this._devices
    }
}   