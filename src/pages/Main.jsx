import { useAccount, useConnect, useDisconnect, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { ABI, contractAddr } from '../contract';

 export default function Main() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect();

  const numWhitelistedAddresses = useContractRead({
    addressOrName: contractAddr,
    contractInterface: ABI,
    functionName: 'numAddressesWhitelisted',
    chainId: 5,
    onError(error) {
      console.log('Error', error)
    },
    
  },);

  const maxWhitelistedAddresses = useContractRead({
    addressOrName: contractAddr,
    contractInterface: ABI,
    functionName: 'maxWhitelistedAddresses',
    chainId: 5,
    onError(error) {
      console.log('Error', error)
    },
  });


console.log(numWhitelistedAddresses.data, maxWhitelistedAddresses.data)

const { config, error } = usePrepareContractWrite({
  addressOrName: contractAddr,
  contractInterface: ABI,
  functionName: "addAddressToWhitelist",
});

const { write } = useContractWrite(config);


const handleClicked=(e)=>{
  e.preventDefault();
  console.log(write)
  write?.();
}

//console.log(maxWhitelistedAddresses.data, numWhitelistedAddresses.data)
    return (
      <div>
          {isConnected? 
          <div>
            <div>Connected to {address}</div>
           
            <button onClick={() => disconnect()}>Disconnect</button>

            <div>
               {maxWhitelistedAddresses.isFetched == true && numWhitelistedAddresses.isFetched == true ?numWhitelistedAddresses.data  + "/" + maxWhitelistedAddresses.data + " Addresses Currently Whitelisted" : "Loading...." } 
            </div>
            { (maxWhitelistedAddresses.isFetched == true && numWhitelistedAddresses.isFetched == true) && (numWhitelistedAddresses.data < maxWhitelistedAddresses.data ) ?  <button disabled={!write} onClick={handleClicked}>Join whitelist</button> : <div>Maximum addresses Whitelisted</div>}

          </div>:
          <div>
            <button onClick={() => connect()}>Connect Wallet</button>
          </div>
        }
        

        
      </div>
    )
 
}