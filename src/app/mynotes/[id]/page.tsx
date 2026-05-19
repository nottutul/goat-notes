import { getUser } from "@/auth/server";
import { updateNote } from "@/actions/noteActions";
import { NoteWorkspace } from "../NoteWorkspace";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getUser();
  const { id } = await params;

  if (!user) {
    redirect("/login");
  }

  const note = await prisma.note.findUnique({
    where: { id },
  });

  if (!note || note.authorId !== user.id) {
    redirect("/mynotes");
  }

  return (
    <main className="w-full flex-1 flex flex-col min-h-[calc(100vh-6rem)] p-4 sm:p-8">
      <NoteWorkspace 
        action={updateNote} 
        initialText={note.text} 
        noteId={note.id} 
        buttonText="Update Note" 
      />
    </main>
  );
}
