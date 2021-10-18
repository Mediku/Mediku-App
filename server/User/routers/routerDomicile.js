const router = require('express').Router()
const ControllerDomicile = require('../Controllers/ControllerDomicile')

router.get('/provinces', ControllerDomicile.findAllProvinces)
router.get('/regencies/:id', ControllerDomicile.findAllRegenciesOfProvince)
router.get('/districts/:id', ControllerDomicile.findDistrictsOfRegency)
router.get('/subdistricts/:id', ControllerDomicile.findSubDistrictsOfDistrict)


module.exports = router