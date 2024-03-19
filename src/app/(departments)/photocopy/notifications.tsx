"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { createNewNotification, deleteNotification } from "@/lib/actions"
import type { notifications } from "@prisma/client"
import { Notifiers } from "@prisma/client"
import { format } from "date-fns"
import { DeleteIcon } from "lucide-react"
import React from "react"

export default function Notifications({
  notifications,
}: {
  notifications: notifications[]
}) {
  const [input, setInput] = React.useState("")

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Manage Department Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full flex flex-col gap-4 mb-4">
          {!notifications.length ? (
            <span className="text-muted-foreground uppercase">
              No notifications sent
            </span>
          ) : (
            <div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex flex-col items-end w-full"
                >
                  <div className="flex flex-row justify-between w-full text-muted-foreground ">
                    <div>{format(notification.created_at, "MMM d, yyyy")}</div>
                    <form
                      action={async (formData) => {
                        await deleteNotification(notification.id)
                      }}
                    >
                      <Button
                        className="rounded-full text-center"
                        variant={"ghost"}
                      >
                        <DeleteIcon className="w-5 h-5 text-red-500" />
                      </Button>
                    </form>
                  </div>
                  <span className="w-full">{notification.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="mt-auto w-full">
        <form
          action={async (formData) => {
            const message = formData.get("message") as string
            if (message) {
              await createNewNotification(Notifiers.PHOTOCOPY, "all", message)
            }
            setInput("")
          }}
          className="flex flex-row gap-2 w-full"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            name="message"
            type="text"
            placeholder="create new notification"
            className="h-10 w-full"
          />
          <Button className="h-10">Create</Button>
        </form>
      </CardFooter>
    </Card>
  )
}
