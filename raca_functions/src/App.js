import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import api from "./Api";
import racaFunctions from './raca-functions.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 id="totalValue">
         Total Value: 
        </h1>
        <table>
          <tbody>
          <tr>
            <th>NFT</th>
            <th>Quantity</th>
            <th>Average Price</th>
            <th>Lowest Price</th>
            <th>Total Value</th>  
          </tr>

          <tr>
            <th id='racaPriceTH'>
            <img width="100vh" height="100vh" src="https://r.poocoin.app/smartchain/assets/0x12BB890508c125661E03b09EC06E404bc9289040/logo.png" />
             
            </th>
            <th></th>
            <th></th>
            <th></th>
            <th> <p id="racaPrice">--</p></th>
          </tr>
          <tr>
            <th>
              <img width="100vh" height="100vh" src="https://racawebsource.s3.us-east-2.amazonaws.com/metamon/media/normal/Naga-N2-9393.png"></img>
            </th>
            <th>
              <p>3</p>
            </th>
            <th>
              <p id="metamonPrice">--</p>
            </th>
            <th>
              <p id="metamonLowestPrice">--</p>
            </th>
            <th>
              <p id="metamonTotal">--</p>
            </th>
          </tr>  
          <tr>
            <th>
              <img width="100vh" height="70vh" src="https://racawebsource.s3.us-east-2.amazonaws.com/metamon/media/DiamondPurple.png"></img>
            </th>
            <th>
              <p>7</p>
            </th>
            <th>
              <p id="purplePrice">--</p>
            </th>
            <th>
              <p id="purpleLowestPrice">--</p>
            </th>
            <th>
              <p id="purpleTotal">--</p>
            </th>
          </tr> 
          <tr>
            <th>
              <img width="70vh" height="100vh" src="https://racawebsource.s3.us-east-2.amazonaws.com/metamon/media/potion.png"></img>
              </th>
              <th>
                <p>51</p>
              </th>
              <th> 
                <p id="potionPrice">--</p> 
              </th>
              <th> 
                <p id="potionLowestPrice">--</p> 
              </th>
              <th>
                <p id="potionTotal">--</p>
              </th>
          </tr>  
              </tbody>
        </table>
        </header>
    </div>
  );
}

export default App;