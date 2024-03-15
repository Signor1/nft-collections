import { ethers } from "ethers";
import erc721 from "./erc721.json";

export const getProposalsContract = (providerOrSigner) =>
  new ethers.Contract(
    import.meta.env.VITE_CONTRACT_ADDRESS,
    erc721,
    providerOrSigner
  );
