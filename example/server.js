
  const SyncObject = require('../src/sync-object')({ url: process.env.REDIS_URL })
  const obj1 = new SyncObject('obj1')
  const obj2 = new SyncObject('obj2')
  const objs = { obj1, obj2 }

  const name   = process.argv[2]
  const target = process.argv[3]
  const prop   = process.argv[4]
  const value  = process.argv[5]

  if (target) {
    objs[target][prop] = value
  }

  setInterval(() => {
    console.log(`[${name}] ` + JSON.stringify(objs))
  }, 10000)
