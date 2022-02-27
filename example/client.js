
const SyncObject = require('../src/sync-object')({ url: process.env.REDIS_URL })
const obj1 = new SyncObject('obj1')
const obj2 = new SyncObject('obj2')
const objs = { obj1, obj2 }

const target = process.argv[2]
const prop   = process.argv[3]
const value  = process.argv[4]

setTimeout(() => {
  if (target && prop && value) {
    objs[target][prop] = value
  }
  if (target && prop && !value) {
    console.log(objs[target][prop])
  }
  if (target && !prop && !value) {
    console.log('[C] ' + JSON.stringify(objs[target]))
  }
  if (!target && !prop && !value) {
    console.log('[C] ' + JSON.stringify(objs))
  }
  process.exit()
}, 100)
