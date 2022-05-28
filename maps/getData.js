const { Router } = require('express')
const router = Router()
const GeoJSON = require('geojson')

router.get('/stations', async (req, res) => {
  try {
    return res.status(200).json({ data: require('./stations.json') })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})



router.get('/exits', async (req, res) => {
  try {
    return res.status(200).json({ data: require('./exits.json') })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


module.exports = router
