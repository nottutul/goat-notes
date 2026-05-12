import { getUser } from "@/auth/server";
import { updateNote } from "@/actions/noteActions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
      <form action={updateNote} className="flex-1 flex flex-col gap-4 w-full h-full">
        <input type="hidden" name="id" value={note.id} />
        <Textarea 
          name="text" 
          defaultValue={note.text}
          placeholder="Write your note here..." 
          className="flex-1 text-lg p-4 resize-none w-full bg-background"
          required
        />
        <Button type="submit" size="lg" className="self-end shrink-0">
          Update Note
        </Button>
      </form>
    </main>
  );
}
