const {validationResult, check} = require('express-validator');

exports.readingValidator = [
    check('deviceId').isString().withMessage('ID do dispositivo inválido'),
    check('value').isNumeric().withMessage('Valor inválido')
]