'use client'
import { streamComponent } from "./actions";
import SearchBox from "./components/searchbox";
import React from "react";

export default function Home() {
  const [searchText, setSearchText] = React.useState('');
  const [component, setComponent] = React.useState<React.ReactNode>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
  };

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      // Handle button click logic here
      e.preventDefault();
      setComponent(streamComponent(searchText))
  };

  return (
    <main className="flex h-screen w-screen flex-col items-start justify-begining pt-5 py-2 bg-zinc-500">
      <SearchBox searchText={searchText} handleInputChange={handleInputChange} handleButtonClick={handleButtonClick} />
      {component}
    </main>
  );
}
