import prisma from "@/lib/db"
import { auth } from "@/auth"
import { notFound } from "next/navigation"
import EditOrderDetails from "./edit-form"
import { PrintStatus } from "@prisma/client"

export default async function PhotocopyEdit({
  params,
}: {
  params: { id: string }
}) {
  const authData = await auth()
  const order = await prisma.photocopy_register.findUnique({
    where: {
      id: Number(params.id),
      regd_no: authData?.user.regd_no,
    },
  })
  if (!order) {
    notFound()
  }

  return <EditOrderDetails order={order} />
}
