# Currency-converter
Change in code : 

const currUrl = `${baseUrl}/${fromCurr.value.toLowerCase()}.json`;
  
    // fetching the JSON data using currency API
    const rawUrl = await fetch(currUrl);
    //converting JSON object to JS object
    const data = await rawUrl.json();

    let convertedData = (data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()] * parseInt(input.value)).toFixed(2);

    result.innerText = `${input.value} ${fromCurr.value} = ${convertedData} ${toCurr.value}`;