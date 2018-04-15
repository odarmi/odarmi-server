
class TableCreator {

    constructor(name, createFunction) {
        this._name = name;
        
        this._createFunction = createFunction;
        console.log(typeof(this.createFunction));
    }

    get name() {
        return this._name;
    }

    get createFunction() {
        return this._createFunction;
    }
}

module.exports = TableCreator;
