const host = 'dworks.io'
export default (context, inject) => {
  // host = (process.server ? context.req.headers.host : window.location.host) || 'visalist.io'
  inject('getFullUrl', getFullUrl)
  inject('getAMPFullUrl', getAMPFullUrl)
}

function getFullUrl(path) {
  // const barehost = host.replace('www.', '').replace('amp.', '')
  return `https://${host}${path}`
}

function getAMPFullUrl(path) {
  // const barehost = host.replace('www.', '').replace('amp.', '')
  return `https://amp.${host}${path}`
}
