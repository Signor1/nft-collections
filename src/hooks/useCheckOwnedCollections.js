import { ethers } from "ethers";
import erc721 from "../constants/erc721.json";
import multicallAbi from "../constants/multicall.json";
import { readOnlyProvider } from "../constants/providers";
import { useEffect, useMemo, useState } from "react";

const useCheckOwnedCollections = () => {
  const [data, setData] = useState([]);

  const tokenIDs = useMemo(
    () => [...Array.from({ length: 30 })].map((_, index) => index),
    []
  );

  useEffect(() => {
    (async () => {
      const itf = new ethers.Interface(erc721);
      const calls = tokenIDs.map((x) => ({
        target: import.meta.env.VITE_CONTRACT_ADDRESS,
        callData: itf.encodeFunctionData("ownerOf", [x]),
      }));

      const multicall = new ethers.Contract(
        import.meta.env.VITE_MULTICALL_ADDRESS,
        multicallAbi,
        readOnlyProvider
      );

      const callResults = await multicall.tryAggregate.staticCall(false, calls);

      const validResponsesIndex = [];

      const validResponses = callResults.filter((x, i) => {
        if (x[0] === true) {
          validResponsesIndex.push(i);
          return true;
        }
        return false;
      });

      const decodedResponses = validResponses.map((x) =>
        itf.decodeFunctionResult("ownerOf", x[1])
      );
      const ownedTokens = [];

      decodedResponses.forEach((addr, index) => {
        const address = Object.values(addr)[0];

        let obj = { address, index: validResponsesIndex[index] };
        ownedTokens.push(obj);
      });

      setData(ownedTokens);
    })();
  }, [tokenIDs]);

  return data;
};

export default useCheckOwnedCollections;
