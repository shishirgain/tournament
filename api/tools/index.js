const delFile = (path) => {
    const fs = require('fs');
    fs.unlink(path, (err) => {
        if (err) {
            console.log(err);
            return;
        }
    })
}

module.exports = { delFile }