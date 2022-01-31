import fetch from "node-fetch";

async function getAveragePrice(category, tokenStandard="BEP721", pageSize="10", sortBy='fixed_price', order="asc") 
{
    let url = new URL("https://market-api.radiocaca.com/nft-sales"),
        params = {
            saleType: "",
            category: category, 
            tokenType: "",
            tokenId: -1,
            token_standard: tokenStandard,
            pageNo: 1,
            pageSize: pageSize,
            sortBy: sortBy,
            order: order,
        }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    
    fetch(url).then(response => {
        return response.json();
    })
    .then(nft => {
        let sum = 0;
        for (let i = 0; i < nft.list.length; i++) {
            const element = nft.list[i];
            sum += parseInt(element.fixed_price);
           // console.log(element);
        }
        console.log( sum / nft.list.length);
    })
} 


getAveragePrice(13);