import { getUser } from "@/auth/server";
import { saveNote } from "@/actions/noteActions";
import { NoteWorkspace } from "./NoteWorkspace";

export default async function MyNotes() {
  const user = await getUser();

  return (
    <main className="w-full flex-1 flex flex-col min-h-[calc(100vh-6rem)] p-4 sm:p-8">
      <NoteWorkspace action={saveNote} buttonText="Save Note" />
    </main>
  );
}



