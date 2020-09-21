
const express = require('express');
const router = express.Router();
const http = require('https');

router.get('/', async(req, res) => {
    res.send('welcome to main page');
});

router.get('/getproduct', (req, res) => { 
    const productToSearch = req.body.queryResult.parameters.product;
    const reqUrl = encodeURI( `https://api.bestbuy.com/v1/products(search=${productToSearch})?apiKey=oCYqFiAKVF5bGvZo6Jrxwi1c&sort=name.asc&show=name,thumbnailImage,sku,bestSellingRank,color,regularPrice,salePrice&pageSize=5&format=json` );
    http.get( reqUrl, responseFromAPI => { 
        let completeResponse = '';
        responseFromAPI.on('data', chunk => { completeResponse += chunk });
        responseFromAPI.on('end', () => { 
            const productFound = JSON.parse(completeResponse);
            let dataToSend = productToSearch;
            dataToSend = `Product Name: ${productFound.products[0].name} \nProduct SKU: ${productFound.products[0].sku} \nProduct Price: ${productFound.products[0].saleprice} \nProduct Image: ${productFound.products[0].thumbnailImage}`;
            return res.json({ fulfillmentText: dataToSend, source: 'getmovie' })
        });
    },error => { 
        return res.json({ fulfillmentText: 'Could not get results at this time', source: 'getmovie', outputContexts: [] })
    });
});

module.exports = router;
