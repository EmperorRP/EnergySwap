const { Requester, Validator } = require('@chainlink/external-adapter')
const axios = require('axios')

const customParams = {
  endpoint: false
}

const createRequest = (input, callback) => {
  const validator = new Validator(callback, input, customParams)
  const jobRunID = validator.validated.id
  const endpoint = validator.validated.data.endpoint

  const config = {
    method: 'get',
    url: `https://xk8sigccf4.execute-api.us-east-1.amazonaws.com/prod/${endpoint}`,
  }

  axios(config)
    .then(response => {
      const data = response.data
      const result = Requester.validateResultNumber(data, ['units_produced']) || Requester.validateResultNumber(data, ['units_consumed'])
      callback(response.status, Requester.success(jobRunID, {data: {result}}))
    })
    .catch(error => callback(500, Requester.errored(jobRunID, JSON.stringify(error))))
}

exports.gcpservice = createRequest

