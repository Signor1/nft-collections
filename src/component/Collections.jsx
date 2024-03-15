
import { Button, Flex, Text, Dialog, TextField } from "@radix-ui/themes";
import useCheckOwnedCollections from "../hooks/useCheckOwnedCollections";
import { useState } from "react";
import useHandleMint from "../hooks/useHandleMint";

const Collections = ({ tokensData }) => {
    const data = useCheckOwnedCollections()

    const [address, setAddress] = useState("")

    const handleMint = useHandleMint(address);

    return (
        <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {tokensData.length === 0 ? (
                <Text>Loading...</Text>
            ) : (
                tokensData.map((x, i) => {
                    return (<div key={x.dna} className="w-full flex flex-col p-4 border border-blue-500/20 rounded-md">
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
                        {data.map(item => {
                            if (i === item.index) {
                                return <NFTLink item={item} key={item.index} />;
                            }
                            return null;
                        })}
                        {data.every(item => i !== item.index) && (
                            <Dialog.Root>
                                <Dialog.Trigger>
                                    <div className="flex justify-between items-center w-full p-4 border border-blue-500/30 rounded-md">
                                        <button className="bg-blue-500 w-full text-sm font-serif font-bold py-2 rounded-md text-gray-100">
                                            Mint
                                        </button>
                                    </div>
                                </Dialog.Trigger>

                                <Dialog.Content style={{ maxWidth: 450 }}>
                                    <Dialog.Title>Mint NFT</Dialog.Title>
                                    <Flex direction="column" gap="3">
                                        <label>
                                            <Text
                                                as="div"
                                                size="2"
                                                mb="1"
                                                weight="bold"
                                            >
                                                Address to be minted to
                                            </Text>
                                            <TextField.Input
                                                value={address}
                                                onChange={e =>
                                                    setAddress(e.target.value)
                                                }
                                                placeholder="Enter address"
                                            />
                                        </label>
                                    </Flex>
                                    <Flex gap="3" mt="4" justify="end">
                                        <Dialog.Close>
                                            <Button
                                                variant="soft"
                                                color="gray"
                                            >
                                                Cancel
                                            </Button>
                                        </Dialog.Close>
                                        <Dialog.Close>
                                            <button
                                                onClick={() =>
                                                    handleMint(x.edition)
                                                }
                                                className="bg-sky-600 px-6 py-2 rounded-md text-white"
                                            >
                                                Mint
                                            </button>
                                        </Dialog.Close>
                                    </Flex>
                                </Dialog.Content>
                            </Dialog.Root>
                        )}
                    </div>)
                })
            )}
        </div>
    )
}



export default Collections


const NFTLink = ({ item }) => {
    return (
        <div key={item.index} className="flex justify-between items-center w-full p-4 border border-blue-500/30 rounded-md">
            <Text className="text-sm text-gray-300">
                Owner: {`${item.address.slice(0, 10)}...`}
            </Text>
            <a href={`https://testnets.opensea.io/assets/mumbai/${import.meta.env.VITE_CONTRACT_ADDRESS}/${item.index}`} target="_blank" className="text-gray-100 bg-blue-500 px-4 py-1.5 font-serif font-bold text-sm rounded-md" rel="noopener noreferrer">
                OpenSea
            </a>
        </div>
    )
}
