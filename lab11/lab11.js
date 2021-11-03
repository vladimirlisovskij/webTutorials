function emitter() {
    let map = new Map()

    return {
        add: function (eventName, subscriber, handler) {
            if (!map.has(eventName)) {
                map.set(eventName, new Map())
            }
            map.get(eventName).set(subscriber, handler)
            return this
        },

        off: function (eventName, subscriber) {
            if (map.has(eventName)) {
                map.get(eventName).delete(subscriber)
                if (map.get(eventName).size === 0) {
                    map.delete(eventName)
                }
            }
            return this
        },

        emit: function (eventName) {
            if (map.has(eventName)) {
                map.get(eventName).forEach((value) => value())
            }
            return this
        }
    }
}


let obj1 = {
    collect: function () {
        console.log("first")
    }
}

let obj2 = {
    collect: function () {
        console.log("second")
    }
}

let obj3 = {
    collect: function () {
        console.log("third")
    }
}

emitter()
    .add("f", obj1, obj1.collect)
    .add("f", obj2, obj2.collect)
    .add("t", obj2, obj2.collect)
    .add("s", obj2, obj2.collect)
    .add("t", obj3, obj3.collect)
    .off("s", obj2)
    .emit("f")
    .emit("s")
    .emit("t")

