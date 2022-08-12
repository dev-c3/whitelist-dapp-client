import {
  WagmiConfig,
  createClient,
  configureChains,
  chain,
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

import Main from './pages/Main'

const infuraId = "70217b9a60fd4fe0a5c8900c9d86f871";



export default function App(){
const {chains, provider, webSocketProvider} = configureChains(
  [chain.goerli],
  [publicProvider()],
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

return <WagmiConfig client={client}>
  <Main/>
</WagmiConfig>;
}



