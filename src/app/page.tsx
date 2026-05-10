import { getUser } from "@/auth/server";

export default async function Home() {
  const user = await getUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold">Home Page</h1>
      {user && <p className="mt-4 text-xl">Welcome {user.email}</p>}
    </div>
  );
}

 