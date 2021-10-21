let hashText = "#firt #second third #fo ur #th #firt #second third #fo ur #th"

function getHashtags(string) {
    return hashText
        .split(" ")
        .map(word => word[0] === "#" ? word.substring(1).toLowerCase() : "")
        .filter(word => word !== "")
}

function getHashtagsUnique(string) {
    return [... new Set(getHashtags(string))].join(", ")
}


let map = new Map()

function addPhone(name, numbers) {
    if (map.has(name)) {
        let temp = map.get(name)
        numbers.forEach( number => temp.add(number))
        map.set(name, temp)
    } else {
        map.set(name, new Set(numbers))
    }
}

function removePhone(number) {
    let res = false

    map.forEach( value => {
        if (value.has(number)) {
            res = true
            value.delete(number)
        }
    })

    return res
}

function show() {
    return [...map].map( val => val[0] + ": " + [...val[1]].join(", "))
}


function parseCommand(commandRaw) {
    let tokens = commandRaw.split(" ")
    switch (tokens[0]) {
        case "ADD":
            addPhone(tokens[1], tokens[2].split(","))
            break;
        case "REMOVE_PHONE":
            alert(removePhone(tokens[1]))
            break
        default:
            alert(show())
    }
}

// alert(getHashtags(hashText));
// alert(getHashtagsUnique(hashText));

parseCommand("ADD vova phone1,phone2")
parseCommand("ADD vova phone1,phone2")
parseCommand("ADD vova2 phone1,phone2")
parseCommand("ADD vova phone3,phone4")
parseCommand("REMOVE_PHONE phone1")
parseCommand("SHOW")
