const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

app.use(cors());

app.get('/api/appartments', (req, res) =>  {
    let arr = []
    
    axios.get('https://www.nepremicnine.net/oglasi-oddaja/ljubljana-mesto/ljubljana-vic-rudnik/stanovanje/cena-od-450-do-570-eur-na-mesec/')
        .then((response) => {
            //let mainEntity = document.querySelector('#vsebina760 div.seznam')
            let html = response.data
            let $ = cheerio.load(html)
            $('#vsebina760 div.seznam div.oglas_container').each((i, element) => {
                arr.push({
                    location: $(element).find('h2 a span.title').text(),
                    price: $(element).find('div.main-data span.cena').text(),
                    year: $(element).find('div.atributi span.leto strong').text(),
                    size: $(element).find('div.main-data span.velikost').text(),
                    type: $(element).find('div.teksti_container span.vrsta') + ' | ' + $(element).find('div.teksti_container span.tipi'),
                    link: $(element).find('div[itemprop="item"] a.slika').attr('href')
                });
            })

            res.send(arr);
        })
        .catch((error) => {
            console.warn(error)
        })
})

app.get('/api/test', (req, res) => {
    res.send('Test');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))