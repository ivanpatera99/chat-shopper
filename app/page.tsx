'use client'
import SearchBox from "./components/searchbox";
import React from "react";

export default function Home() {
  const [searchText, setSearchText] = React.useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
  };

  const handleButtonClick = () => {
      // Handle button click logic here
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center p-24 bg-zinc-500">
      <SearchBox searchText={searchText} handleInputChange={handleInputChange} handleButtonClick={handleButtonClick} />
    </main>
  );
}
