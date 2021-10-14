

getData('//localhost:1234/todos/10')
// getData('https://www.ukr.net/dat/smart/struct.9.json?_=1633868174127')




async function getData(url) {
  try {
    const response = await fetch(url);
    console.log(response);
    if (response.ok) {
        const json = await response.json();
        console.log(json);
    } else{
        throw `Bad response! ${response.statusText} (${response.status})`
    }
  } catch (error) {
    console.warn(error);
  }
}


postData('//localhost:1234/todos', {
    title: Math.random(),
    status: false
})

async function postData(url, data) {
    try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              "Content-type": 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
      });
      console.log(response);
      if (response.ok) {
          const json = await response.json();
          console.log(json);
      } else{
          throw `Bad response! ${response.statusText} (${response.status})`
      }
    } catch (error) {
      console.warn(error);
    }
  }