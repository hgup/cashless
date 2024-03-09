import { Bell } from "lucide-react"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import clsx from "clsx"
import { fetchNotifications } from "@/lib/data"
import { Badge } from "../ui/badge"
import { format } from "date-fns"

export default async function ({ className }: { className: string }) {
  const notifications = await fetchNotifications()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={clsx("rounded-full relative", className)}
        >
          <Bell className="w-5 h-5" />
          {notifications.length ? (
            <span className="absolute -top-0 -right-0">
              <span className="relative top-0 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[350px] ml-3 lg:ml-0 bg-neutral-200/75 dark:bg-neutral-950/75 backdrop-blur"
      >
        {notifications.length == 0 ? (
          <div className="w-full">No new notifications</div>
        ) : (
          <div className="w-full flex flex-col gap-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex flex-col items-end gap-2 w-full"
              >
                <div className="flex flex-row justify-between w-full text-muted-foreground ">
                  <div>{format(notification.created_at, "MMM d, yyyy")}</div>
                  <Badge className="rounded-full">{notification.from}</Badge>
                </div>
                <span className="w-full">{notification.message}</span>
              </div>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
