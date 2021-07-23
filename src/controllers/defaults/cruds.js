import axios from 'axios'

export default {
  list(url, callback) {
    axios.get(url).then((response) => {
      if (response && response.data) {
        callback(response.data)
      } else {
        callback({})
      }
    })
  },

  get(url, id, callback) {
    axios.get(url + id).then((response) => {
      if (response && response.data) {
        callback(response.data)
      } else {
        callback({})
      }
    })
  },

  insert(url, data, callback) {
    axios.post(url, data).then((response) => {
      if (response && response.data) {
        callback(response.data)
      } else {
        callback({})
      }
    })
  },
  post(url, data, callback) {
    axios.post(url, data).then((response) => {
      if (response && response.data) {
        callback(response.data)
      } else {
        callback({})
      }
    })
  },

  update(url, data, callback) {
    axios.put(url + data.id, data).then((response) => {
      if (response && response.data) {
        callback(response.data)
      } else {
        callback({})
      }
    })
  },

  put(url, data, callback) {
    axios.put(url + data.id, data).then((response) => {
      if (response && response.data) {
        callback(response.data)
      } else {
        callback({})
      }
    })
  },
}
