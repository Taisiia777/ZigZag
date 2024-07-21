import { makeAutoObservable } from 'mobx';
import { toJS } from 'mobx';

class InfoStore {
    info = {};

    constructor() {
        makeAutoObservable(this);
    }

    getInfo() {
        return toJS(this.info);
    }

    setInfo(data) {
        this.info = data;
    }
}

const infoStore = new InfoStore();
export default infoStore;