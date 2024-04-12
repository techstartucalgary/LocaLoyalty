
/*
https://docs.clover.com/reference/ordercreateatomicorder

merchant id: 8830RN7Z4YNE1
bread loaf id: GBV9R3WWJHPEE
cheese bun id: X7JAEET37MWVR
*/

    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Bearer {oAuth token}'
        },
        body: JSON.stringify({
          orderCart: {
            discounts: [],
            lineItems: [
              {
                item: {id: 'X7JAEET37MWVR'}, //cheese bun id    
                printed: 'false',
                exchanged: 'false',
                modifications: [],
                refunded: 'false',
                refund: {transactionInfo: {isTokenBasedTx: 'false', emergencyFlag: 'false'}},
                isRevenue: 'false'
              }
            ],
            orderType: {
              taxable: 'false',
              isDefault: 'false',
              filterCategories: 'false',
              isHidden: 'false',
              isDeleted: 'false',
              id: 'GAM80DMM3DEDG' //random order id?
            },
            groupLineItems: 'false'
          }
        })
      };
      
      fetch('https://sandbox.dev.clover.com/v3/merchants/8830RN7Z4YNE1/atomic_order/orders', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));