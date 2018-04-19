
class TableCreator {

    constructor(name, createFunction) {
        this._name = name;
        this._createFunction = createFunction;
    }

    get name() {
        return this._name;
    }

    get createFunction() {
        return this._createFunction;
    }
}

export { TableCreator };
