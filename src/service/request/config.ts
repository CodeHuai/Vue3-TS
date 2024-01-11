let baseURL = ''
let timeout = 1000 * 3

if (process.env.NODE_ENV === 'development') {
  baseURL = '/api'
  timeout = 3 * 1000
} else if (process.env.NODE_ENV === 'production') {
  baseURL = 'http://codercba.com:5000/'
  timeout = 3 * 1000
} else {
  baseURL = 'http://codercba.com:5000/'
  timeout = 3 * 1000
}


export {
  baseURL,
  timeout
}
