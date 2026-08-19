import { listarHinos } from "./data/repositorio";

function App() {
  listarHinos().then((hinos) => console.log(hinos));
  return <h1>Catálogo</h1>;
}

export default App;
