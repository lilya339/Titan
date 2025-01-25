import Layout from "./components/Layout/Layout";
import Content from "./components/Content/Content";
import Header from "./components/Header/Header";

function App() {

  return (
    <Layout>
      <Header title="Quotes Of the Day" />
      <Content />
    </Layout>
  );
}

export default App;
