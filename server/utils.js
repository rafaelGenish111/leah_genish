function getValueFromBody(body, property) {
    const value = body[property]
    if (!value) {
        throw `missing param ${property}`
    }
    return value;
};

module.exports = getValueFromBody