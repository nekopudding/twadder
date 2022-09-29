const baseURL = 'http://localhost:4000'

const fetchApi = async (path = '',method = 'GET',body = null) => {
  try {
    const response = await fetch(`${baseURL}${path}`, {
      method: method, 
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: body && JSON.stringify(body)
    });
    return response;
  } catch (err) {
    console.log(`Server error: ${err}`);
    return {
      json: () => { return {
        msg: `Server error: ${err}`
      }}
    };
  }
  
}

export {baseURL,fetchApi};