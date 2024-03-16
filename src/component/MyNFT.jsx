import { Button, Flex, Text, Dialog, TextField } from "@radix-ui/themes";
import useHandleTransfer from "../hooks/useHandleTransfer";
import { useState } from "react";

const MyNFT = ({ myTokensData, isLoading }) => {
    const [receiver, setReceiver] = useState("")

    const handleTransfer = useHandleTransfer(receiver)

    return (
        <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {isLoading ? (
                <Text className="text-gray-100">Loading</Text>
            ) : myTokensData.length !== 0 ? (
                myTokensData.map((x) => (
                    <div key={x.dna} className="w-full flex flex-col gap-2 p-4 border border-blue-500/20 rounded-md">
                        <div className="w-full h-[200px]">
                            <img
                                src={x.image}
                                className="w-full h-full object-cover"
                                alt={x.name}
                            />
                        </div>
                        <Text className="block text-base font-serif font-semibold text-blue-500">
                            <span className="text-gray-100">Name:</span> {x.name}
                        </Text>
                        <Text className="block text-sm text-gray-400 mb-3">
                            Description: {x.description}
                        </Text>

                        <Dialog.Root>
                            <div className="flex justify-between items-center w-full p-4 border border-blue-500/30 rounded-md">
                                <a href={`https://testnets.opensea.io/assets/mumbai/${import.meta.env.VITE_CONTRACT_ADDRESS}/${x.edition}`} target="_blank" className="text-gray-100 underline font-serif font-bold text-sm " rel="noopener noreferrer">
                                    OpenSea
                                </a>
                                <Dialog.Trigger>
                                    <button className="text-gray-100 bg-blue-500 px-4 py-1.5 font-serif font-bold text-sm rounded-md">Transfer</button>
                                </Dialog.Trigger>
                            </div>

                            <Dialog.Content style={{ maxWidth: 450 }}>
                                <Dialog.Title>Transfer NFT</Dialog.Title>


                                <Flex direction="column" gap="3">
                                    <label>
                                        <Text as="div" size="2" mb="1" weight="bold">
                                            Recipient&apos;s Address
                                        </Text>
                                        <TextField.Input
                                            value={receiver}
                                            onChange={e => setReceiver(e.target.value)}
                                            placeholder="Enter receiver's address"
                                        />
                                    </label>
                                </Flex>

                                <Flex gap="3" mt="4" justify="end">
                                    <Dialog.Close>
                                        <Button variant="soft" color="gray">
                                            Cancel
                                        </Button>
                                    </Dialog.Close>
                                    <Dialog.Close>
                                        <button onClick={() => handleTransfer(x.edition)} className="bg-blue-500 px-6 py-2 rounded-md text-white">Transfer</button>
                                    </Dialog.Close>
                                </Flex>
                            </Dialog.Content>
                        </Dialog.Root>
                    </div>
                ))
            ) : <Text>No NFT owned yet</Text>}
        </div>
    )
}

export default MyNFT