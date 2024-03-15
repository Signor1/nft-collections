import { Box, Button, Flex, Text, Dialog, TextField } from "@radix-ui/themes";
import useHandleTransfer from "../hooks/useHandleTransfer";

const MyNFT = ({ myTokensData }) => {

    // useHandleTransfer()

    const handleTransfer = (id) => {

    }

    return (
        <Flex align="center" gap="8" wrap={"wrap"}>
            {myTokensData.length === 0 ? (
                <Text>No NFT owned yet</Text>
            ) : (
                myTokensData.map((x) => (
                    <Box key={x.dna} className="w-[20rem]">
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
                        <a href={`https://testnets.opensea.io/assets/mumbai/${import.meta.env.VITE_CONTRACT_ADDRESS}/${x.edition}`} target="_blank" className="text-sky-600 my-2 underline block" rel="noopener noreferrer">
                            Check out on OpenSea
                        </a>
                        <Dialog.Root>
                            <Dialog.Trigger>
                                <button className="bg-sky-600 px-6 py-2 rounded-md text-white">Transfer</button>
                            </Dialog.Trigger>

                            <Dialog.Content style={{ maxWidth: 450 }}>
                                <Dialog.Title>Transfer NFT</Dialog.Title>


                                <Flex direction="column" gap="3">
                                    <label>
                                        <Text as="div" size="2" mb="1" weight="bold">
                                            Recipient&apos;s Address
                                        </Text>
                                        <TextField.Input
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
                                        <button onClick={handleTransfer(x.edition)} className="bg-sky-600 px-6 py-2 rounded-md text-white">Transfer</button>
                                    </Dialog.Close>
                                </Flex>
                            </Dialog.Content>
                        </Dialog.Root>
                    </Box>
                ))
            )}
        </Flex>
    )
}

export default MyNFT