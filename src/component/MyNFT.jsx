import { Box, Button, Flex, Text } from "@radix-ui/themes";

const MyNFT = ({ myTokensData }) => {
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
                        <Button className="px-8 py-2 text-xl mt-2">
                            Mint
                        </Button>
                    </Box>
                ))
            )}
        </Flex>
    )
}

export default MyNFT