import axios from "axios";

function getRacaPrice() { 
    return axios.get('https://market-api.radiocaca.com/tokens/raca/price');
  }

function getNFTPrice(category, tokenID, sortBy, tokenStandard, pageSize="10", order="asc") {
    return axios.get('https://market-api.radiocaca.com/nft-sales', 
        {
        params: {
            saleType: "",
            category: category, 
            tokenType: "",
            tokenId: -1,
            token_standard: tokenStandard,
            pageNo: 1,
            pageSize: pageSize,
            sortBy: sortBy,
            order: order,
            tokenId: tokenID,
            ...(category === 13 ? { min_level: 59,  max_level: 60, min_score: 300,
                max_score: 650 } : {})
        }}).then(nft => {
                let sum = 0;
                for (let i = 0; i < nft.data.list.length; i++) {
                    const element = nft.data.list[i];          
                    if (category === 13)
                        sum += parseInt(element.fixed_price);
                    else       
                        sum += parseInt(element.fixed_price) / element.count;
                }
                return [(sum / nft.data.list.length).toFixed(0), nft.data.list[0].fixed_price / nft.data.list[0].count];
            })
}

Promise.all([
            getRacaPrice(),
            getNFTPrice(13, -1, 'fixed_price', 'BEP721'), 
            getNFTPrice(16, 1, 'single_price', 'BEP1155'), 
            getNFTPrice(15, -1, 'single_price', 'BEP1155')
    ])
    .then(function (results) {
        let racaPrice = document.getElementById('racaPrice');
        let metamonPrice = document.getElementById('metamonPrice');
        let purplePrice = document.getElementById('purplePrice');
        let potionPrice = document.getElementById('potionPrice');
        
        let metamonTotal = document.getElementById('metamonTotal');
        let purpleTotal = document.getElementById('purpleTotal');
        let potionTotal = document.getElementById('potionTotal');


        let metamonLowestPrice = document.getElementById('metamonLowestPrice');
        let purpleLowestPrice = document.getElementById('purpleLowestPrice');
        let potionLowestPrice = document.getElementById('potionLowestPrice');

        let totalValue = document.getElementById('totalValue');
        
        console.log("results: ", results);
        let metamonSum = ((results[0]).data.data.price * results[1][0] * 7).toFixed(2);
        let purpleSum = (results[0].data.data.price * results[2][0] * 7).toFixed(2);
        let potionSum = (results[0].data.data.price * results[3][0] * 51).toFixed(2);

        metamonTotal.innerHTML = metamonSum + "$";
        purpleTotal.innerHTML = purpleSum + "$";
        potionTotal.innerHTML = potionSum + "$";

        metamonLowestPrice.innerHTML = String(results[1][1]).replace(/(.)(?=(\d{3})+$)/g,'$1,')  + ' Raca';  
        purpleLowestPrice.innerHTML = String(results[2][1]).replace(/(.)(?=(\d{3})+$)/g,'$1,')  + ' Raca';  
        potionLowestPrice.innerHTML = String(results[3][1]).replace(/(.)(?=(\d{3})+$)/g,'$1,')  + ' Raca';  
        
        console.log("results: ", results);
        racaPrice.innerHTML = results[0].data.data.price + '$' ;  
        metamonPrice.innerHTML =  String(results[1][0]).replace(/(.)(?=(\d{3})+$)/g,'$1,')  + ' Raca';  
        purplePrice.innerHTML = String(results[2][0]).replace(/(.)(?=(\d{3})+$)/g,'$1,')  + ' Raca';  
        potionPrice.innerHTML =  results[3][0]  + ' Raca   ' ;  
        totalValue.innerHTML = "Total Value: " + (parseInt(metamonSum) + parseInt(purpleSum) + parseInt(potionSum)) + "$";
    });
