import { getUser } from "@/auth/server"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Note } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"


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
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar