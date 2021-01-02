const currencyList = document.querySelector('.currency__grid')
const label = document.querySelector('.grid__base-label');
const textField = document.querySelector('.grid__converter__area')
const baseOption = document.querySelector('#grid__converter__base-selector')
const otherOption = document.querySelector('#grid__converter__other-selector')
const loading = document.querySelector('.loading')
const button = document.querySelector('.button')
const converterResult = document.querySelector('.converter_value')

document.addEventListener('DOMContentLoaded', () => {
  const data = []
  const output = []

  fetch('https://api.frankfurter.app/latest?from=USD')
    .then(response => response.json())
    .then(value => {
      data.push(value)   
      label.innerHTML = data[0].base   
      constructDom(data[0])
      constructSelectValues(data[0]) 
      loading.style.display = 'none';     
    })

    const fetchCurrencyName = async () => {
        await fetch('https://api.frankfurter.app/currencies')
          .then(response => response.json())
          .then(value => {
            let output = [value]
            console.log(output)
          })               
    }    
  //give an amount and it returns the particular amount of dom element;
  function constructDom(data) {    
    currencyList.innerHTMl = ''    
    let eachCurrencyName = Object.keys(data.rates).sort((a, b) => {
      if (a - b) {
        return a
      } else {
        return b
      }
    })
    for (let i = 0; i < eachCurrencyName.length; i++) {
      let div = `
        <div class="grid__currency">
          <p class="currency__name font-weight-bold ml-3">${eachCurrencyName[i]}</p>          
          <div class="currency__values col-md-12">
            <div class="currency__values-base">
              <p>${data.base}</p>
              <p>${data.amount}</p>
            </div>
            <div class="currency__values-rate">
              <p>${eachCurrencyName[i]}</p>
              <p>${data.rates[eachCurrencyName[i]]}</p>              
            </div>
          <p class="currency__values-code" >${data.base}${eachCurrencyName[i]}</p>          
        </div>
      `
      currencyList.innerHTML += div
    }
  }
  function constructSelectValues(data) {
    baseOption.innerHTML = ''
    otherOption.innerHTML = ''
    let eachCurrencyName = Object.keys(data.rates)
    for (let i = 0; i < eachCurrencyName.length; i++) {
      let options = `
        <option value=${eachCurrencyName[i]}>${eachCurrencyName[i]}</option>
      `
      baseOption.innerHTML += options;
      otherOption.innerHTML += options;
  }
}
 

})
 const values = {}
  textField.addEventListener('keyup', (e) => {
    let { name, value} = e.target
    values[name] = value;    
  })
  baseOption.addEventListener('click', (e) => {
    let { name, value} = e.target
    values[name] = value;    
  })  
  otherOption.addEventListener('click', (e) => {
    let { name, value} = e.target
    values[name] = value;    
  })
  function parseValue()
  function convert(base, other, amount) {    
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?amount=${amount}&from=${base}&to=${other}`)
      .then(resp => resp.json())
      .then((data) => { 
        let value = JSON.stringify(data.rates[other])       
        let statement = `${amount} ${base} = ${value} ${other}`;
        converterResult.classList.add('active')
        converterResult.innerHTML += statement;
        setTimeout(() => {
          converterResult.classList.remove('active')
          converterResult.innerHTML = '';
        }, 2800)
        
        
      })      
  }
  button.addEventListener('click', (e) => {
    e.preventDefault()
    const { base, other, amount} = values;
    convert(base, other, amount);
  })