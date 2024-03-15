import { Container } from "@radix-ui/themes";
import { configureWeb3Modal } from "./connection";
import "@radix-ui/themes/styles.css";
import Header from "./component/Header";
import AppTabs from "./component/AppTabs";
import useCollections from "./hooks/useCollections";
import useMyNfts from "./hooks/useMyNfts";
import Collections from "./component/Collections";
import MyNFT from "./component/MyNFT";

configureWeb3Modal();

function App() {
  const tokensData = useCollections();
  const myTokenIds = useMyNfts();

  const myTokensData = tokensData.filter((x, index) =>
    myTokenIds.includes(index)
  );
  return (
    <Container>
      <Header />
      <main className="mt-6">
        <AppTabs
          MyNfts={
            <MyNFT myTokensData={myTokensData} />
          }
          AllCollections={
            <Collections tokensData={tokensData} />
          }
        />
      </main>
    </Container>
  );
}

export default App;
