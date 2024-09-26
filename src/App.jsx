import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import MainContent from "./components/layout/MainContent";

function App() {
  return (
    <div className="dark:bg-black flex flex-col min-h-screen">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
