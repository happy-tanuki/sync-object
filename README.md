# SyncObject

## usage

### initialize

    const SyncObject = require('sync-object')({ url: process.env.REDIS_URL })
    const obj1 = new SyncObject('obj1')
    const obj2 = new SyncObject('obj2')

### just like a JS object

    obj1.hello = 'world'
    obj2.key = obj1.hello
    obj1.hello = 'goodbye'
    delete obj1.hello

## example

    $ cd example
    $ node server.js S1 obj1 hello world &
    $ node server.js S2 obj2 key value &
    $ node client.js obj1 hello goodbye
    $ node client.js obj2 new world
    $ node client.js
    [C]  {"obj1":{"hello":"goodbye"},"obj2":{"key":"value","new":"world"}}
    [S1] {"obj1":{"hello":"goodbye"},"obj2":{"key":"value","new":"world"}}
    [S2] {"obj1":{"hello":"goodbye"},"obj2":{"key":"value","new":"world"}}
