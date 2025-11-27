import { useState } from "react";

export default function Filters({ onChange }) {
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [sort, setSort] = useState("");

  function update(g, val) {
    const obj = { genre, year, sort, [g]: val };
    onChange(obj);
  }

  return (
    <div
      className="
        grid grid-cols-2 sm:grid-cols-3 gap-3
        bg-black/10 dark:bg-white/5 p-4 rounded-xl
        border border-white/10
      "
    >
      {/* GENRE */}
      <select
        value={genre}
        onChange={(e) => {
          setGenre(e.target.value);
          update("genre", e.target.value);
        }}
        className="input"
      >
        <option value="">Gatunek</option>
        <option value="Action">Akcja</option>
        <option value="Comedy">Komedia</option>
        <option value="Drama">Dramat</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Horror">Horror</option>
      </select>

      {/* YEAR */}
      <select
        value={year}
        onChange={(e) => {
          setYear(e.target.value);
          update("year", e.target.value);
        }}
        className="input"
      >
        <option value="">Rok</option>
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2020">2020</option>
        <option value="2015">2015</option>
      </select>

      {/* SORT */}
      <select
        value={sort}
        onChange={(e) => {
          setSort(e.target.value);
          update("sort", e.target.value);
        }}
        className="input"
      >
        <option value="">Sortuj</option>
        <option value="year">Rok</option>
        <option value="rating">Ocena</option>
        <option value="title">Tytuł</option>
      </select>
    </div>
  );
}