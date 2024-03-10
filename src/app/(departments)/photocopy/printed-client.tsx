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
import { Dept } from "@prisma/client"
import {
  LightningBoltIcon,
  ViewGridIcon,
  ViewHorizontalIcon,
  ViewVerticalIcon,
} from "@radix-ui/react-icons"
import clsx from "clsx"
import { Ban, Check, IndianRupeeIcon, PrinterIcon } from "lucide-react"
import { string } from "zod"
import { useRouter, useSearchParams } from "next/navigation"
import React from "react"
import DownloadComponent from "@/components/photocopy/download-file"
import { formatCurrency, getOrderFileName } from "@/lib/utils"
import StudentAvatar from "@/components/student-avatar"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import useUrlParams from "@/lib/hooks/use-url-params"
import PaymentPortal from "@/components/payment-portal"

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

export default function PrintedClient({
  query,
  page,
  orders,
}: {
  query?: string
  page?: string
  orders: OrderWithStudentDetails[]
}) {
  const [selected, setSelected] = React.useState(orders[0])
  const [show, setShow] = React.useState(true)

  React.useEffect(() => {
    if (orders.length == 0) {
      setShow(false)
    }
    if (orders.length == 1) {
      setSelected(orders[0])
      setShow(true)
    }
  })
  useUrlParams("t", "printed")

  // const searchParams = useSearchParams()
  // const { replace } = useRouter()
  // const params = new URLSearchParams(searchParams)
  // params.set("t", "pending")
  // replace(`/photocopy?${params.toString()}`) // updates the URL with the user's search data

  return (
    <div className="">
      {show ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 scroll-ml-2 overflow-auto  scroll-smooth gap-2 lg:max-h-[80vh] md:max-h-[550px] ">
            {orders.map((order, index) => (
              <div
                key={order.id}
                className="flex flex-row gap-2 m-0.5 md:m-1 justify-between items-center snap-start"
              >
                <div
                  className="flex-grow select-none"
                  onClick={() => {
                    setSelected(() => order)
                  }}
                >
                  <Card
                    className={clsx(
                      "flex flex-col items-center outline-green-400 bg-neutral-50 dark:bg-neutral-900 outline-1 p-0",
                      {
                        "outline outline-2 outline-green-500":
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
                          />
                        </div>
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-row w-full  justify-end">
                      <div className="flex flex-row gap-2 h-10 items-center text-right text-sm">
                        <span>{getOrderFileName(order.file)}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="justify-between flex flex-row w-full">
                      <span className="cursor-pointer  text-muted-foreground">
                        <Badge className="text-base" variant={"outline"}>
                          {formatCurrency(order.cost ?? 0 * 100)}
                        </Badge>
                      </span>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            autoFocus={index == 0}
                            variant={"outline"}
                            tabIndex={0}
                            className="text-green-400 hover:bg-green-400 hover:text-black"
                          >
                            Pay
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="w-[400px]">
                          <AlertDialogHeader>
                            Select Mode of payment
                          </AlertDialogHeader>
                          <AlertDialogDescription className="w-full justify-evenly flex flex-row gap-2 items-center">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  autoFocus={true}
                                  className="w-[150px] h-[150px] aspect-square flex flex-col gap-2"
                                  variant="outline"
                                >
                                  <LightningBoltIcon
                                    fill="#fff"
                                    className="w-14 h-14"
                                  />
                                  Cashless
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  Confirm this transaction
                                </AlertDialogHeader>
                                <PaymentPortal
                                  from={order.regd_no}
                                  from_img={order.student.photo}
                                  amount={order.cost ?? 0}
                                  to={Dept.PHOTOCOPY}
                                  to_img={"/images/dept/photocopy.png"}
                                  id={order.id}
                                  particulars={
                                    "PHOTOCOPY: " + getOrderFileName(order.file)
                                  }
                                />
                                <AlertDialogDescription className="flex flex-col text-[15px]">
                                  <span className="font-semibold text-[18px]">
                                    Payee Details
                                  </span>
                                  <div className="flex flex-row justify-between text-[15px]">
                                    <span className="font-normal">
                                      {order.student.name}
                                    </span>
                                    <span>{order.regd_no}</span>
                                  </div>

                                  <span className="mt-2 font-semibold text-[18px]">
                                    Order Details
                                  </span>
                                  <div className="flex flex-col">
                                    <span className="">
                                      {"File: "}
                                      {getOrderFileName(order.file)}
                                    </span>
                                    <span className="">
                                      {"Number of Copies: "}
                                      {order.num_of_copies}
                                    </span>
                                    <span className="">
                                      {"Particulars: "}
                                      {order.particulars ?? "None"}
                                    </span>
                                  </div>
                                </AlertDialogDescription>
                                <div className="w-full flex flex-col items-end">
                                  <AlertDialogCancel className="w-min">
                                    Cancel
                                  </AlertDialogCancel>
                                </div>
                              </AlertDialogContent>
                            </AlertDialog>
                            <Button
                              className="w-[150px] h-[150px] aspect-square flex flex-col gap-2"
                              variant="outline"
                            >
                              <IndianRupeeIcon className="w-14 h-14" />
                              Cash
                            </Button>
                          </AlertDialogDescription>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            ))}
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
