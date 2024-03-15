import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import { getProposalsContract } from "../constants/contracts";
import { ethers } from "ethers";

const useHandleMint = (address) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(
    async (id) => {
      if (!isSupportedChain(chainId))
        return toast.error("Wrong network !", { position: "top-right" });

      const readWriteProvider = getProvider(walletProvider);

      const signer = await readWriteProvider.getSigner();

      const contract = getProposalsContract(signer);

      const fee = ethers.parseEther("0.01");

      try {
        const mintTransaction = await contract.safeMint(address, id, {
          value: fee,
        });

        console.log("transaction: ", mintTransaction);

        const receipt = await mintTransaction.wait();

        console.log("receipt: ", receipt);

        if (receipt.status) {
          return toast.success("Minted successfully !", {
            position: "top-right",
          });
        }

        toast.error("Transaction failed !", { position: "top-right" });
      } catch (error) {
        console.log(error);

        toast.error(error.reason, { position: "top-right" });
      }
    },
    [chainId, walletProvider, address]
  );
};

export default useHandleMint;
