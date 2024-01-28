import { useContractRead } from 'wagmi';
import { blockmakerTokenABI } from '../contracts/ABIs';
import { Title } from './ui';

export default function Owner() {
  const result = useContractRead({
    abi: blockmakerTokenABI,
    address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS, 
    functionName: 'owner'
  });

  console.log('Resultado lectura owner', result);

  return (
    <div className="bg-white p-4 border shadow rounded-md">
      <h1>Owner</h1>
      <p className="bg-gray-100 text-zinc-600 p-2 rounded-md text-sm">{result.data}</p>
    </div>
  );
}