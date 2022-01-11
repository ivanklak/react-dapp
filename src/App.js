import {useState} from "react";
import {ethers} from "ethers";
import './App.css';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {

  const [greeting, setGreetingValue] = useState('');

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts'});
  }

  async function fetchGreeting() {
    //if metamask (or wallet) exists in browser
    if (typeof window.ethereum !== 'undefined') {
      //create a provider, which takes wallet as value
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      //create a contract which pass address, ABI from compiled contract, and provider
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet()
        //return greeting
        console.log('data: ', data)
      } catch (err) {
        console.log('Error: ', err)
      }
    }
  }

  async function setGreeting() {
    if (!greeting) return null
    if (typeof window.ethereum !== 'undefined') {
      //user connect his wallet
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      //create signer to sign the transaction
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      setGreetingValue('')
      //waiting for the actual transaction to be confirmed on the  blockchain
      await transaction.wait()
      //again, just to make sure everything is working
      fetchGreeting()
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input
            onChange={e => setGreetingValue(e.target.value)}
            placeholder="Set greeting"
            value={greeting}
        />
      </header>
    </div>
  );
}

export default App;
