import './App.css';
import { Routes, Route } from "react-router-dom";
import { PokemonList } from '../PokemonList';
import { MyPokemonList } from '../MyPokemonList';
import { PokemonDetail } from '../PokemonDetail';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<PokemonList />} />
      <Route path="/my-pokemon" element={<MyPokemonList />} />
      <Route path="/pokemon/:id" element={<PokemonDetail />} />
    </Routes>
  );
}