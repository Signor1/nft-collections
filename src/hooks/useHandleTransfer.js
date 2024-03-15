import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import { getProposalsContract } from "../constants/contracts";
import { ZeroAddress, isAddress } from "ethers";

const useHandleMint = (receiver) => {
  const { chainId, address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(
    async (id) => {
      if (!isSupportedChain(chainId))
        return toast.error("Wrong network !", { position: "top-right" });

      //checking for valid address
      if (!isAddress(address))
        return toast.error("Invalid Address !", {
          position: "top-right",
        });

      //checking for zero address
      if (address === ZeroAddress)
        return toast.error("You can not transfer to zero address !", {
          position: "top-right",
        });

      const readWriteProvider = getProvider(walletProvider);

      const signer = await readWriteProvider.getSigner();

      const contract = getProposalsContract(signer);

      try {
        const transferTransaction = await contract.transferFrom(
          address,
          receiver,
          id
        );

        console.log("transaction: ", transferTransaction);

        const receipt = await transferTransaction.wait();

        console.log("receipt: ", receipt);

        if (receipt.status) {
          return toast.success("Transfer was successfully !", {
            position: "top-right",
          });
        }

        toast.error("Transfer failed !", { position: "top-right" });
      } catch (error) {
        console.log(error);

        toast.error(error.reason, { position: "top-right" });
      }
    },
    [chainId, walletProvider, address, receiver]
  );
};

export default useHandleMint;
