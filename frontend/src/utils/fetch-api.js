const baseURL = 'http://localhost:4000'

const fetchApi = async (path = '',method = 'GET',body = null) => {
  const response = await fetch(`${baseURL}${path}`, {
    method: method, 
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: body && JSON.stringify(body)
  });
  return response;
}

export {baseURL,fetchApi};