import "./App.css";
import Item from "./components/item/item";
import { FavoritesProvider } from "./context/context";

function App() {
  return (
    <div className="App">
      <FavoritesProvider>
        <Item />
      </FavoritesProvider>
    </div>
  );
}

export default App;
