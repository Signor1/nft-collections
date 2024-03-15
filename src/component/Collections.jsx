
import { Box, Button, Flex, Text, Dialog, TextField } from "@radix-ui/themes";
import useCheckOwnedCollections from "../hooks/useCheckOwnedCollections";
import { useState } from "react";
import useHandleMint from "../hooks/useHandleMint";

const Collections = ({ tokensData }) => {
    const data = useCheckOwnedCollections()

    const [address, setAddress] = useState("")

    const handleMint = useHandleMint(address);

    return (
        <Flex align="center" gap="8" wrap={"wrap"}>
            {tokensData.length === 0 ? (
                <Text>Loading...</Text>
            ) : (
                tokensData.map((x, i) => {
                    return (<Box key={x.dna} className="w-[20rem]">
                        <img
                            src={x.image}
                            className="w-full object-contain"
                            alt={x.name}
                        />
                        <Text className="block text-2xl">
                            Name: {x.name}
                        </Text>
                        <Text className="block">
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
                                    <button className="bg-sky-600 px-6 py-2 rounded-md text-white">
                                        Mint
                                    </button>
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
                    </Box>)
                })
            )}
        </Flex>
    )
}



export default Collections


const NFTLink = ({ item }) => {
    return (
        <div key={item.index} className="flex flex-col">
            <Text className="py-2 text-base mt-2 bg-gray-300 text-gray-900 px-4 rounded-lg">
                Owned By: {`${item.address.slice(0, 13)}...`}
            </Text>
            <a href={`https://testnets.opensea.io/assets/mumbai/${import.meta.env.VITE_CONTRACT_ADDRESS}/${item.index}`} target="_blank" className="text-sky-600 mt-2 underline" rel="noopener noreferrer">
                Check out on OpenSea
            </a>
        </div>
    )
}
