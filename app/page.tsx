'use client'
export const maxDuration = 60;
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
    <main className="flex h-lvh w-screen flex-col items-start justify-begining pt-5 py-2 bg-zinc-500" style={{ overflowY: 'scroll' }}>
      <SearchBox searchText={searchText} handleInputChange={handleInputChange} handleButtonClick={handleButtonClick} />
      {component}
    </main>
  );
}
