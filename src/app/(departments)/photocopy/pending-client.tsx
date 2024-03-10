"use client"

import {
  LayoutAsItIs,
  LayoutHandout,
  LayoutMicro,
  LayoutMini,
} from "@/components/photocopy/photocopy-icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { printOrderWithId, rejectOrderWithId } from "@/lib/actions"
import { OrderWithStudentDetails } from "@/lib/data"
import type { PrintLayout } from "@prisma/client"
import {
  ViewGridIcon,
  ViewHorizontalIcon,
  ViewVerticalIcon,
} from "@radix-ui/react-icons"
import clsx from "clsx"
import { Ban, Check, PrinterIcon } from "lucide-react"
import { string } from "zod"
import { useRouter, useSearchParams } from "next/navigation"
import React from "react"
import DownloadComponent from "@/components/photocopy/download-file"
import { getOrderFileName } from "@/lib/utils"
import StudentAvatar from "@/components/student-avatar"

const layouts: any = {
  MICRO: {
    name: "Micro",
    element: <LayoutMicro className="mb-3 h-6 w-6" />,
  },
  MINI: {
    name: "Mini",
    element: <LayoutMini className="mb-3 h-6 w-6" />,
  },
  HANDOUT: {
    name: "Handout",
    element: <LayoutHandout className="mb-3 h-6 w-6" />,
  },
  AS_IT_IS: {
    name: "As It Is",
    element: <LayoutAsItIs className="mb-3 h-6 w-6" />,
  },
}
const orientations: any = {
  AS_IT_IS: {
    name: "As It Is",
    element: <ViewGridIcon className="mb-3 h-6 w-6" />,
  },
  VERTICAL: {
    name: "Vertical",
    element: <ViewVerticalIcon className="mb-3 h-6 w-6" />,
  },
  HORIZONTAL: {
    name: "Horizontal",
    element: <ViewHorizontalIcon className="mb-3 h-6 w-6" />,
  },
  BEST_FIT: {
    name: "Best Fit",
    element: <Check className="mb-3 h-6 w-6" />,
  },
}

const duplexity: any = {
  BACK_TO_BACK: {
    name: "Back to Back",
    element: <Check className="mb-3 h-6 w-6" />,
  },
  SINGLE: {
    name: "Single Side",
    element: <ViewHorizontalIcon className="mb-3 h-6 w-6" />,
  },
}

export default function PendingClient({
  query,
  page,
  orders,
}: {
  query?: string
  page?: string
  orders: OrderWithStudentDetails[]
}) {
  const [selected, setSelected] = React.useState(orders[0])

  // const searchParams = useSearchParams()
  // const { replace } = useRouter()
  // const params = new URLSearchParams(searchParams)
  // params.set("t", "pending")
  // replace(`/photocopy?${params.toString()}`) // updates the URL with the user's search data

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {orders.length != 0 ? (
        <>
          <div className="flex flex-col overflow-auto scroll-smooth gap-2 lg:h-[80vh] md:h-[550px] p-3 pl-1 snap-proximity">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-row gap-2 justify-between items-center snap-start"
              >
                <div
                  className="flex-grow select-none"
                  onClick={() => {
                    setSelected(() => order)
                  }}
                >
                  <Card
                    className={clsx(
                      "flex flex-col items-center outline-sky-400 bg-neutral-50 dark:bg-neutral-900 outline-1 ",
                      {
                        "outline outline-2 outline-sky-500":
                          selected.id === order.id,
                      }
                    )}
                  >
                    <CardHeader className="w-full">
                      <CardTitle className="flex text-right flex-row gap-2 justify-between">
                        <Badge className="h-min" variant="secondary">
                          {order.id}
                        </Badge>
                        <div className="flex flex-row items-center gap-2 ">
                          <div className="flex flex-col gap-1 items-end">
                            <span className="text-lg">
                              {order.student.name}
                            </span>
                            <Badge variant="outline" className="w-min">
                              {order.regd_no}
                            </Badge>
                          </div>

                          <StudentAvatar
                            src={order.student.photo}
                            name={order.student.name}
                            className="w-14 h-14"
                          />
                        </div>
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-row w-full  justify-end">
                      <div className="flex flex-row gap-2 items-center text-right text-sm">
                        <span>{getOrderFileName(order.file)}</span>

                        <DownloadComponent
                          className="z-3 text-sky-700 hover:text-sky-300 peer-hover:"
                          file={order.file}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden lg:my-auto md:block p-3">
            <Card className="">
              {selected ? (
                <div>
                  {" "}
                  <CardHeader>
                    <CardTitle className="flex text-right flex-row gap-2 justify-between">
                      Details ({selected.num_of_copies}x copies)
                    </CardTitle>
                  </CardHeader>
                  <CardDescription></CardDescription>
                  <CardContent className="space-y-2">
                    <div className="flex flex-row gap-2 w-full mb-7">
                      <Label
                        htmlFor="2"
                        className="flex flex-col flex-1 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        {orientations[selected.orientation]?.element}
                        {orientations[selected.orientation]?.name}
                      </Label>
                      <Label
                        htmlFor="3"
                        className="flex flex-col flex-1 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        {duplexity[selected.sides].element}
                        <span className="text-xs">
                          {duplexity[selected.sides].name}
                        </span>
                      </Label>
                      <Label
                        htmlFor="1"
                        className="flex flex-col flex-1 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        {layouts[selected.page_layout].element}
                        {layouts[selected.page_layout].name}
                      </Label>
                    </div>

                    <div className="mb-6 grid gap-2">
                      <Label htmlFor="name">
                        Specify Pages{" "}
                        <span className="text-muted-foreground text-sm">
                          (leave black for ALL pages)
                        </span>
                      </Label>
                      <Input
                        className="bg-transparent h-11"
                        value={selected.pages ?? ""}
                        id="specify-pages"
                        placeholder="ALL"
                        disabled={true}
                      />
                    </div>

                    <div className="flex-1 space-y-2.5">
                      <Label htmlFor="particulars">Particulars</Label>
                      <Textarea
                        id="particulars"
                        maxLength={180}
                        placeholder="eg. Please make the cover page portrait and single page, and the rest of the pages back to back."
                        className="h-32 md:h-24"
                        value={selected.particulars ?? "Nothing in particular"}
                        disabled={true}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-row justify-between">
                    <form
                      action={async () => {
                        setSelected(orders[1])
                        await rejectOrderWithId(selected.id)
                      }}
                    >
                      <Button
                        className="rounded-full mr-4 gap-2 h-12 text-red-400 hover:bg-red-500 hover:text-white"
                        variant="outline"
                      >
                        <span>Reject</span> <Ban className="" />
                      </Button>
                    </form>
                    <form
                      action={async () => {
                        setSelected(orders[1])
                        await printOrderWithId(selected.id)
                      }}
                    >
                      <Button
                        className="rounded-full mr-4 gap-2 h-12 text-green-400 hover:bg-green-500 hover:text-black"
                        variant="outline"
                      >
                        <span>Print</span> <PrinterIcon className="" />
                      </Button>
                    </form>
                  </CardFooter>
                </div>
              ) : null}
            </Card>
          </div>
        </>
      ) : (
        <div className="col-span-2 text-center p-10 text-muted-foreground">
          {" "}
          No new orders{" "}
        </div>
      )}
    </div>
  )
}
