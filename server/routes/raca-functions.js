import fetch from "node-fetch";

async function getAveragePrice(category, tokenStandard="BEP721", pageSize="10", sortBy='fixed_price', order="asc") 
{
    let value = 0;
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
    
    let getAvg = fetch(url).then(response => {
        return response.json();
    })
    .then(nft => {
        for (let i = 0; i < nft.list.length; i++) {
            const element = nft.list[i];
            value += parseInt(element.fixed_price);
           // console.log(element);
        }
        value = value / nft.list.length;
    })
    await sleep(3000);
    return value;
} 

(async () => {
    await getAveragePrice(13).then((a) => {
        console.log(a)
    })
  })()

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
//console.log(getAveragePrice(13));