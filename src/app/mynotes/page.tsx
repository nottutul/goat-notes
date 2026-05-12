import { getUser } from "@/auth/server";
import { saveNote } from "@/actions/noteActions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default async function MyNotes() {
  const user = await getUser();

  return (
    <main className="w-full flex-1 flex flex-col min-h-[calc(100vh-6rem)] p-4 sm:p-8">
      <form action={saveNote} className="flex-1 flex flex-col gap-4 w-full h-full">
        <Textarea 
          name="text" 
          placeholder="Write your note here..." 
          className="flex-1 text-lg p-4 resize-none w-full bg-background"
          required
        />
        <Button type="submit" size="lg" className="self-end shrink-0">
          Save Note
        </Button>
      </form>
    </main>
  );
}



