/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  PointerInterface,
  PointerInterfaceInterface,
} from "../../../../../../@chainlink/contracts/src/v0.8/interfaces/PointerInterface";

const _abi = [
  {
    inputs: [],
    name: "getAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class PointerInterface__factory {
  static readonly abi = _abi;
  static createInterface(): PointerInterfaceInterface {
    return new utils.Interface(_abi) as PointerInterfaceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PointerInterface {
    return new Contract(address, _abi, signerOrProvider) as PointerInterface;
  }
}
