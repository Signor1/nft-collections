import { Box, Tabs } from "@radix-ui/themes";

const AppTabs = ({ MyNfts, AllCollections }) => {
    return (
        <Tabs.Root defaultValue="collections" className="mt-8 px-4">
            <Tabs.List>
                <Tabs.Trigger value="myNft" className="text-gray-100">My NFTs</Tabs.Trigger>
                <Tabs.Trigger value="collections" className="text-gray-100">All Collections</Tabs.Trigger>
            </Tabs.List>

            <Box px="4" pt={`7`} pb="9">
                <Tabs.Content value="myNft">{MyNfts}</Tabs.Content>

                <Tabs.Content value="collections">{AllCollections}</Tabs.Content>
            </Box>
        </Tabs.Root>
    );
};

export default AppTabs;
