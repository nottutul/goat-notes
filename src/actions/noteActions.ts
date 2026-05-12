"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "@/auth/server";
import { revalidatePath } from "next/cache";

export async function saveNote(formData: FormData) {
  const text = formData.get("text") as string;
  if (!text || text.trim() === "") return;

  const user = await getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  await prisma.note.create({
    data: {
      text,
      authorId: user.id,
    },
  });

  revalidatePath("/mynotes");
}

export async function updateNote(formData: FormData) {
  const id = formData.get("id") as string;
  const text = formData.get("text") as string;
  
  if (!id || !text || text.trim() === "") return;

  const user = await getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  // Verify ownership before updating
  const existingNote = await prisma.note.findUnique({
    where: { id }
  });

  if (!existingNote || existingNote.authorId !== user.id) {
    throw new Error("Unauthorized or note not found");
  }

  await prisma.note.update({
    where: { id },
    data: { text },
  });

  revalidatePath("/mynotes");
  revalidatePath(`/mynotes/${id}`);
}
