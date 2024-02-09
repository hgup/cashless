"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { deleteOrderWithId } from "@/lib/actions"
import { fetchNewPhotocopyOrders } from "@/lib/data"
import { getOrderFileName } from "@/lib/utils"
import { photocopy_register } from "@prisma/client"
import clsx from "clsx"
import { Trash2Icon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NewOrders({
  orders,
}: {
  orders: photocopy_register[]
}) {
  const pathname = usePathname()
  return (
    <div className="flex flex-col gap-2">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex flex-row gap-2 justify-between items-center"
        >
          <Link href={`/student/photocopy/${order.id}`} className="flex-grow">
            <Card
              className={clsx("bg-transparent w-full", {
                "bg-neutral-900":
                  pathname.split("/").pop() === order.id.toString(),
              })}
            >
              <CardHeader className="">
                <CardTitle className="flex text-right flex-row gap-2 justify-between">
                  <Badge variant="secondary">{order.id}</Badge>
                  <span>{getOrderFileName(order.file)}</span>
                </CardTitle>
              </CardHeader>
              <CardDescription></CardDescription>
            </Card>
          </Link>

          <form
            key={order.id}
            action={async () => {
              await deleteOrderWithId(order.id)
            }}
          >
            <Button
              className="rounded-full w-12 h-12 text-red-400 hover:bg-red-500 hover:text-white"
              variant={"outline"}
            >
              <Trash2Icon className="" />
            </Button>
          </form>
        </div>
      ))}
    </div>
  )
}
