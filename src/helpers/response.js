module.exports = (status = false, message, data = {}, options = {}) => {

  const response = { status, message }
  if (Object.keys(data).length) { Object.assign(response, { data }) }
  if (Object.keys(options).length) { Object.assign(response, { options }) }
  return response

}