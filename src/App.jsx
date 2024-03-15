import { Container } from "@radix-ui/themes";
import { configureWeb3Modal } from "./connection";
import "@radix-ui/themes/styles.css";
import Header from "./component/Header";
import AppTabs from "./component/AppTabs";
import useCollections from "./hooks/useCollections";
import useMyNfts from "./hooks/useMyNfts";
import Collections from "./component/Collections";
import MyNFT from "./component/MyNFT";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

configureWeb3Modal();

function App() {
  const tokensData = useCollections();
  const [myTokenIds, isLoading] = useMyNfts();

  const myTokensData = tokensData.filter((x, index) =>
    myTokenIds.includes(index)
  );
  return (
    <section className="w-full min-h-screen bg-gray-950 text-gray-100">
      <Container >
        <Header />
        <main className="mt-6">
          <AppTabs
            MyNfts={
              <MyNFT myTokensData={myTokensData} isLoading={isLoading} />
            }
            AllCollections={
              <Collections tokensData={tokensData} />
            }
          />
        </main>
        <ToastContainer />
      </Container>
    </section>
  );
}

export default App;
