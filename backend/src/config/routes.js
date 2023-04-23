const express = require('express')

module.exports = function(server){
    const router = express.Router()
    server.use('/api', router)

    const BilingCycle = require('../api/bilingCycle/bilingCycleService')
    BilingCycle.register(router, '/bilingCycles')
}