'use client'
import { useEffect, useState } from 'react';

export default function Home() {
  const [hello, setHello] = useState('');

  useEffect(() => {
    fetch('/api/openai')
      .then(response => response.json())
      .then(data => setHello(data.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <main className="flex h-screen flex-col items-center justify-between p-24">
      <div>{hello}</div>
    </main>
  );
}
