"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AiChat } from "@/components/AiChat";

interface NoteWorkspaceProps {
  initialText?: string;
  noteId?: string;
  action: (formData: FormData) => void;
  buttonText: string;
}

export function NoteWorkspace({ initialText = "", noteId, action, buttonText }: NoteWorkspaceProps) {
  const [noteContent, setNoteContent] = useState(initialText);

  return (
    <div className="flex-1 flex flex-col md:flex-row gap-6 w-full h-full min-h-[500px]">
      <form action={action} className="flex-1 flex flex-col gap-4 min-w-0 relative">
        {noteId && <input type="hidden" name="id" value={noteId} />}
        <Button type="submit" size="lg" className="self-end shrink-0">
          {buttonText}
        </Button>
        <Textarea 
          name="text" 
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Write your note here...." 
          className="flex-1 text-lg p-4 resize-none w-full bg-background shadow-sm"
          required
        />
      </form>
      
      <div className="w-full md:w-[350px] lg:w-[400px] xl:w-[450px] shrink-0 h-[500px] md:h-auto">
        <AiChat noteContent={noteContent} />
      </div>
    </div>
  );
}
