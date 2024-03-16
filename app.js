const baseUrl = "https://2024-03-06.currency-api.pages.dev/v1/currencies/"

const dropdown = document.querySelectorAll(".dropdown select")

const btn = document.querySelector("form button")

const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")

const msg = document.querySelector(".msg")

window.addEventListener("load", () => {
    updateExchangeRate()
})

for (let select of dropdown){
    for (currCode in countryList) {
        let newOption = document.createElement("option")
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD"){
            newOption.selected = "selected"
        } else if (select.name === "to" && currCode === "INR"){
            newOption.selected = "selected"
        }

        select.append(newOption)
    }


    select.addEventListener("change", (e) => {
        updateFlag(e.target)
})
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img =  element.parentElement.querySelector("img")
    img.src = newSrc
}


btn.addEventListener("click", (e) => {
    e.preventDefault();
    updateExchangeRate();
})

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval === "" || amtval<1) {
        amtval = 1;
        amount.value = "1"
    }

    const url = `${baseUrl}/${fromCurr.value.toLowerCase()}.json`
    let response = await fetch(url);
    let data = await response.json()
    let rate = (data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()] * parseInt(amount.value)).toFixed(2);
    msg.innerText = `${amtval} ${fromCurr.value} = ${rate} ${toCurr.value}`
}