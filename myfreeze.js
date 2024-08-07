if (!Object.prototype.myFreeze) {
    Object.prototype.myFreeze = function () {
        if (typeof this !== "object" || this === null) {
            throw new TypeError("It has to be an object.");
        }

        Object.defineProperty(this, '__isFrozen', {
            value: true,
            configurable: false,
            writable: false,
            enumerable: false
        });

        Object.keys(this).forEach(function (prop) {
            if (typeof this[prop] === 'object' && this[prop] !== null) {
                this[prop].myFreeze();
            }
        }, this);

        return this;
    };
}

if (!Object.prototype.isMyFrozen) {
    Object.prototype.isMyFrozen = function () {
        return this.__isFrozen === true;
    };
}

let obj = { a: 1, b: { c: 2 } };

obj.myFreeze();
console.log(obj.isMyFrozen()); 
console.log(obj.b.isMyFrozen());