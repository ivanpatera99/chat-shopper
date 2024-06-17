import Navbar from "./components/navbar";

export default function Template({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
        <Navbar />
        {children}
    </div>
  );
}