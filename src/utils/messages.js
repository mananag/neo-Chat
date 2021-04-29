const getMessage = (text, type = '') => {
    return {
        type,
        text,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    getMessage
}