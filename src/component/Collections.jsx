
import { Box, Button, Flex, Text } from "@radix-ui/themes";

const Collections = ({ tokensData }) => {
    return (
        <Flex align="center" gap="8" wrap={"wrap"}>
            {tokensData.length === 0 ? (
                <Text>Loading...</Text>
            ) : (
                tokensData.map((x) => (
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

export default Collections