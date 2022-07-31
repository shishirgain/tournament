const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './temp/uploads');
    },
    filename: function (req, file, cb) {
        let extension = file.originalname.split('.').slice(-1)[0];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`)
    }
})

const upload = multer({ storage: storage });

module.exports = { storage: upload };