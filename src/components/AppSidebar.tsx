import { getUser } from "@/auth/server"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Note } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

async function AppSidebar() {
    const user = await getUser()

    let notes: Note[] = []

    if(user){
        notes = await prisma.note.findMany({
            where: {
                authorId: user.id
            },
            orderBy: {
                updatedAt: 'desc'
            }
        })
    }

  return (
    <Sidebar className="!top-24 !h-[calc(100svh-6rem)]">
      <SidebarHeader className="p-4 pb-2">
        <Link href="/mynotes" className="font-bold text-lg hover:underline">
          + New Note
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className="px-2 mb-2 font-semibold text-sm text-muted-foreground">Your Notes</div>
          <SidebarMenu>
            {notes.map(note => (
              <SidebarMenuItem key={note.id}>
                <SidebarMenuButton asChild>
                  <Link href={`/mynotes/${note.id}`}>
                    {note.text.slice(0, 30) || "Empty note"}
                    {note.text.length > 30 ? "..." : ""}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            {notes.length === 0 && (
              <div className="px-2 text-sm text-muted-foreground">No notes yet.</div>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar