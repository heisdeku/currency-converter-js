document.addEventListener('DOMContentLoaded', () => {
  const data = [];
  const currencyList = document.querySelector('.currency__grid')
  const label = document.querySelector('.grid__base-label');  
  fetch('../../public/mockData.json')
    .then(response => response.json())
    .then(value => {            
      data.push(value); 
      constructDom(data[0]) 
      label.innerHTML = data[0].base    
    })
    .catch(error => console.log('error', error)) 
              
  //give an amount and it returns the particular amount of dom element;
  function constructDom(data) {
    currencyList.innerHTMl = ''    
    let eachCurrency = data.currencies         
    for (let i = 0;i < eachCurrency.length; i++) {                      
        let div = `
        <div class="grid__currency">
          <p class="currency__name font-weight-bold ml-3">${eachCurrency[i].name}</p>
          <div class="currency__values col-md-12">
            <div class="currency__values-base">
              <p>${data.base}</p>
              <p>${data.index}</p>
            </div>
            <div class="currency__values-rate">
              <p>${eachCurrency[i].name}</p>
              <p>${eachCurrency[i].value}</p>              
            </div>
          <p class="currency__values-code" >${eachCurrency[i].code}</p>          
        </div>
      `  
      currencyList.innerHTML += div
      }             
    }     
  
})