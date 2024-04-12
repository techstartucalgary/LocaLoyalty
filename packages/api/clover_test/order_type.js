const fetch = require('node-fetch');

const merchantId = '8830RN7Z4YNE1';
const oauthToken = 'f7ed0fb1-710c-6b16-9942-57f37f5e3913';

const url = `https://sandbox.dev.clover.com/v3/merchants/${merchantId}/order_types`;

const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${oauthToken}`
    }
};

fetch(url, options)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.error('Error:', err));
