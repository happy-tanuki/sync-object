const NRP = require('node-redis-pubsub')

const GET = (name) => name + ':get'
const SET = (name) => name + ':set'
const DEL = (name) => name + ':del'

module.exports = (config) => {
  const nrp = new NRP(config)

  return function(name) {
    const target = {}

    nrp.on(GET(name), () => {
      nrp.emit(SET(name), target)
    })

    nrp.on(SET(name), (data) => {
      Object.assign(target, data)
    }, () => {
      nrp.emit(GET(name), target)
    })

    nrp.on(DEL(name), (data) => {
      delete target[data]
    })

    return new Proxy(target, {
      set: function (obj, prop, value) {
        obj[prop] = value
        nrp.emit(SET(name), { [prop]: value })
      },

      deleteProperty: function (obj, prop) {
        delete obj[prop]
        nrp.emit(DEL(name), prop)
      }
    })
  }
}
