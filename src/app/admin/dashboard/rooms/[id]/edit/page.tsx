import Form from "./edit-form"
import Breadcrumbs from "@/components/ui/breadcrumbs"
import { fetchRoomById } from "@/lib/data"
import { notFound } from "next/navigation"
import { Room } from "@prisma/client"

export default async function Page({ params }: { params: { id: Room } }) {
  const id = params.id
  const room = await fetchRoomById(id)

  if (!room) {
    notFound()
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Rooms", href: "/admin/dashboard/rooms" },
          {
            label: `Edit details of ${room.room_no}`,

            href: `/admin/dashboard/rooms/${id}/edit`,
            active: true,
          },
        ]}
      />
      <div className="">
        <Form room={room} />
      </div>
    </main>
  )
}
