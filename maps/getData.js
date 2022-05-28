const { Router } = require('express')
const router = Router()

const stations = require('./stations.json')
const exits = require('./exits.json')

router.get('/stations', async (req, res) => {
  try {
    return res.status(200).json({ data: stations })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})



router.get('/exits', async (req, res) => {
  try {
    return res.status(200).json({ data: exits })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


module.exports = router
