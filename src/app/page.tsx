import Image from "next/image";

export default function Home() {
  return (
    <>
      <h1>Goat Notes</h1>
      <Image src="/goatnotesicon.png" alt="goaticon" width={1000} height={800}></Image>
    </>
  );
}

