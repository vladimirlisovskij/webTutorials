function TimerFabric(dateStr) {
    let mainTokens = dateStr.split(" ")
    let yearTokens = mainTokens[0].split("-")
    let hourTokens = mainTokens[1].split(":")

    let date = new Date(yearTokens[0], yearTokens[1], yearTokens[2])
    date.setHours(hourTokens[0])
    date.setMinutes(hourTokens[1])


    let res = {
        value: "",

        add: function (value, type) {
            this.check(value, type)
            switch (type) {
                case "hours":
                    date.setHours(date.getHours() + value)
                    break
                case "month":
                    date.setMonth(date.getMonth() + value)
                    break
                case "days":
                    date.setDate(date.getDate() + value)
                    break
                case "minutes":
                    date.setMinutes(date.getMinutes() + value)
                    break
            }
            this.update()
            return this
        },

        subtract: function (value, type) {
            this.check(value, type)
            switch (type) {
                case "hours":
                    date.setHours(date.getHours() - value)
                    break
                case "month":
                    date.setMonth(date.getMonth() - value)
                    break
                case "days":
                    date.setDate(date.getDate() - value)
                    break
                case "minutes":
                    date.setMinutes(date.getMinutes() - value)
                    break
            }
            this.update()
            return this
        },

        update: function () {

            this.value = date.getFullYear() +
                "-" +
                (date.getMonth() < 10 ? "0" : "") +
                date.getMonth() +
                "-" +
                (date.getDate() < 10 ? "0" : "") +
                date.getDate() +
                " " +
                (date.getHours() < 10 ? "0" : "") +
                date.getHours() +
                ":" +
                (date.getMinutes() < 10 ? "0" : "") +
                date.getMinutes()
        },

        check: function (value, type) {
            if (value < 0) throw TypeError
            if (!["hours", "month", "days", "minutes"].some(format => format === type)) {
                throw TypeError
            }
        }
    }
    res.update()

    return res
}

let time = TimerFabric("2017-05-16 13:45")
    .add(24, "hours")
    .subtract(1, "month")
    .add(3, "days")
    .add(15, "minutes")

console.log(time.value)