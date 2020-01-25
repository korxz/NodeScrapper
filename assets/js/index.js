let priceBlock = document.getElementById('price-blocks');
let infoSection = document.getElementById('info-section');

fetch('http://localhost:3000', {
    method: 'GET'
    })
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        infoSection.append(infoBlock(json));
        for(let appartment of json) {
            priceBlock.append(appartmentBlock(appartment.location, appartment.price, appartment.year, appartment.size, appartment.type, appartment.link));
        }
    })
    .catch((error) => {
        console.warn(error);
    });

/**
 * 
 * @param {string} location 
 * @param {number} price 
 * @param {number} year 
 * @param {number} size 
 * @param {string} type
 * @param {string} link
 */
function appartmentBlock(location, price, year, size, type, link)
{
    let div = document.createElement('div');
    //div.style = 'display: inline-block; margin: 10px 20px; padding: 10px; background-color: gainsboro; width: 250px; height: 200px;';
    div.className = 'appartment-container';
    div.innerHTML =  `
        <p data-name='location'>` + location + `</p>
        <p data-name='price'>` + price + `</p>
        <p data-name='year'>` +year + `</p>
        <p data-name='size'>` +  size +`</p>
        <p data-name='type'>` +  type +`</p>
        <a href='https://www.nepremicnine.net` + link + `'> Povezava </a>
    `;

    return div;
}

/**
 * 
 * @param {array} appartments 
 */
function infoBlock(appartments)
{
    let numberOfApp = appartments.length;
    let filteredArray = appartments.map((app) => {
        return parseInt(app.price.split(' ')[0].replace(',', '.'));
    })
    let avgPriceOfApp = filteredArray.reduce((total, price) => total + price) / numberOfApp;

    let div = document.createElement('div');
    div.className = 'info-flex-container';
    div.innerHTML = `
        <div data-name='number-of-appartments' class='info-display-block'><p>Number of appartments: ` + numberOfApp + `</p></div>
        <div data-name='avrage-price' class='info-display-block'><p>Average price: ` + avgPriceOfApp + `</p></div>
    `;

    return div;
}