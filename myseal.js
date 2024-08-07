if (!Object.prototype.mySeal) {
    Object.prototype.mySeal = function () {
        if (typeof this !== "object" || this === null) {
            throw new TypeError("It has to be an object.");
        }

        Object.defineProperty(this, '__isSealed', {
            value: true,
            configurable: false,
            writable: false,
            enumerable: false
        });

        Object.keys(this).forEach(function (prop) {
            Object.defineProperty(this, prop, {
                configurable: false
            });

            if (typeof this[prop] === 'object' && this[prop] !== null) {
                this[prop].mySeal();
            }
        }, this);

        return this;
    };
}

if (!Object.prototype.isMySealed) {
    Object.prototype.isMySealed = function () {
        return this.__isSealed === true;
    };
}

let obj = { x: 10, y: { z: 20 } };

obj.mySeal();
console.log(obj.isMySealed());
console.log(obj.y.isMySealed());