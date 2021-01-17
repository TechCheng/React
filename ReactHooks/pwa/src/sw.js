console.log('run')

//serverice work生命周期
self.addEventListener('install', event => {
  console.log('install', event)
  event.waitUntil(self.skipWaiting())
  // event.waitUntil(new Promise(resolve=>{
  //   setTimeout(()=>{
  //     resolve('111')
  //   },4000)
  // }))
})
self.addEventListener('activate', event => {
  console.log('activate', event)
  event.waitUntil(self.clients.claim())
})
self.addEventListener('fetch', event => {
  console.log('fetch', event)
})
