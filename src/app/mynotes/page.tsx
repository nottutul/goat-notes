import { getUser } from "@/auth/server";

export default async function MyNotes() {
  const user = await getUser();

  return (
    <main className="w-full">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)]">
        <h1 className="text-5xl font-bold">My Notes</h1>
        {user && <p className="mt-4 text-xl">Welcome {user.email}</p>}
      </div>
    </main>
  );
}



