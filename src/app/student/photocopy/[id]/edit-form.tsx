"use client"
import {
  LayoutAsItIs,
  LayoutHandout,
  LayoutMicro,
  LayoutMini,
} from "@/components/photocopy/photocopy-icons"
// import { Icons } from "@/components/icons"
import { AlertDescription } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { updateOrderDetails } from "@/lib/actions"
import { formatCurrency, getOrderFileName, getTentativeCost } from "@/lib/utils"
import {
  PrintDuplexity,
  PrintLayout,
  PrintOrientations,
  photocopy_register,
} from "@prisma/client"
import {
  ViewGridIcon,
  ViewHorizontalIcon,
  ViewVerticalIcon,
} from "@radix-ui/react-icons"
import { Check } from "lucide-react"
import React from "react"
import { useFormState } from "react-dom"

export default function EditOrderDetails({
  order,
}: {
  order: photocopy_register
}) {
  const updateOrderWithId = updateOrderDetails.bind(null, order.id)
  const [state, dispatch] = useFormState(updateOrderWithId, undefined)

  const [data, setData] = React.useState({
    orientation: order.orientation,
    sides: order.sides,
    pages: order.pages ?? "",
    page_layout: order.page_layout,
    particulars: order.particulars,
    num_of_copies: order.num_of_copies,
    file_pages: order.file_pages,
  })
  const [cost, setCost] = React.useState(0)
  const [changed, setChanged] = React.useState(false)
  React.useEffect(() => {
    setCost(getTentativeCost(data))
  }, [data])

  const { toast } = useToast()
  return (
    <form
      action={async (formData) => {
        formData.set("orientation", data.orientation)
        formData.set("sides", data.sides)
        formData.set("pages", data.pages ?? "")
        formData.set("page_layout", data.page_layout)
        formData.set("particulars", data.particulars ?? "")
        formData.set("num_of_copies", data.num_of_copies.toString())
        dispatch(formData)
        toast({
          className: "text-xl",
          title: "Successful Operation!",
          description: `Updated Order details`,
        })
        setChanged(false)
      }}
    >
      <Card className="flex flex-col">
        <CardHeader className="grow mt-5">
          <CardTitle className="flex flex-col md:flex-row text-lg gap-4 justify-between px-2 md:items-center">
            <span>
              Edit Order Details for{" "}
              <span className="text-muted-foreground">
                {getOrderFileName(order.file)}
                {order.file_pages ? (
                  <span className="text-sm"> ({order.file_pages}) </span>
                ) : null}
              </span>
            </span>
            <PhotoAlert tentative_cost={cost} />
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="grow grid gap-4 md:px-20">
          <div className="grid gap-4 md:gap-20 grid-cols-1 lg:grid-cols-2">
            <div className="mb-2">
              <h3 className="mb-2 peer-focus:border-2">Print Orientation</h3>
              <RadioGroup
                id="orientation"
                className="grid-flow-row grid grid-cols-2 gap-2"
                defaultValue={order.orientation}
                onValueChange={(val: PrintOrientations) => {
                  setChanged(true)
                  setData((prev) => {
                    prev.orientation = val
                    return prev
                  })
                }}
              >
                <div>
                  <RadioGroupItem
                    value={PrintOrientations.AS_IT_IS}
                    id="po_as_it_is"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="po_as_it_is"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <ViewGridIcon className="mb-3 h-6 w-6" />
                    As It Is
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value={PrintOrientations.VERTICAL}
                    id="vertical"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="vertical"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary "
                  >
                    <ViewVerticalIcon className="mb-3 h-6 w-6" />
                    Vertical
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value={PrintOrientations.HORIZONTAL}
                    id="horizontal"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="horizontal"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <ViewHorizontalIcon className="mb-3 h-6 w-6" />
                    Horizontal
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value={PrintOrientations.BEST_FIT}
                    id="best_fit"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="best_fit"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Check className="mb-3 h-6 w-6" />
                    Best Fit
                  </Label>
                </div>
              </RadioGroup>
              <div className="mt-6">
                <h3 className="mb-2">Print Duplexity</h3>
                <RadioGroup
                  defaultValue={order.sides}
                  className="grid-flow-row grid grid-cols-2 gap-2"
                  onValueChange={(val: PrintDuplexity) => {
                    setChanged(true)
                    setData((prev) => {
                      prev.sides = val
                      return prev
                    })
                  }}
                >
                  <div>
                    <RadioGroupItem
                      value={PrintDuplexity.BACK_TO_BACK}
                      id="back_to_back"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="back_to_back"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Check className="mb-3 h-6 w-6 whitespace-nowrap" />
                      Back To Back
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value={PrintDuplexity.SINGLE}
                      id="single_side"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="single_side"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <ViewHorizontalIcon className="mb-3 h-6 w-6 whitespace-nowrap" />
                      Single Side
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <div>
              <div className="mb-6 grid gap-2">
                <Label htmlFor="name">
                  Specify Pages{" "}
                  <span className="text-muted-foreground text-sm">
                    (leave black for ALL pages)
                  </span>
                </Label>
                <Input
                  className="bg-transparent h-11"
                  defaultValue={order.pages ?? ""}
                  id="specify-pages"
                  placeholder="eg. 2-14,23,25,36-40"
                  onChange={(e) => {
                    setChanged(true)
                    setData((prev) => {
                      prev.pages = e.target.value
                      setCost(getTentativeCost(prev))
                      return prev
                    })
                  }}
                />
              </div>
              <h3 className="mb-2 mt-0.5">Print Layout</h3>
              <RadioGroup
                defaultValue={order.page_layout}
                className="grid-flow-row grid grid-cols-2 gap-2"
                onValueChange={(val: PrintLayout) => {
                  setChanged(true)
                  setData((prev) => {
                    prev.page_layout = val
                    setCost(getTentativeCost(prev))
                    return prev
                  })
                }}
              >
                <div>
                  <RadioGroupItem
                    value={PrintLayout.AS_IT_IS}
                    id="pl_as_it_is"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="pl_as_it_is"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <LayoutAsItIs className="mb-3 h-8 w-8 text-white" />
                    As It Is{" "}
                    <span className="text-muted-foreground text-sm">
                      {" "}
                      (Word){" "}
                    </span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value={PrintLayout.MINI}
                    id="mini"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="mini"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <LayoutMini className="mb-3 h-8 w-8" />
                    Mini{" "}
                    <span className="text-muted-foreground font-normal text-sm">
                      {" "}
                      (pdf){" "}
                    </span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value={PrintLayout.MICRO}
                    id="micro"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="micro"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <LayoutMicro className="mb-3 h-8 w-8" />
                    Micro{" "}
                    <span className="text-muted-foreground font-normal text-sm">
                      {" "}
                      (ppt){" "}
                    </span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value={PrintLayout.HANDOUT}
                    id="handout"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="handout"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <LayoutHandout className="mb-3 h-8 w-8" />
                    Handout{" "}
                    <span className="text-muted-foreground font-normal text-sm">
                      {" "}
                      (Exam!?){" "}
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="space-y-2 flex flex-row gap-10">
            <div className="flex-1 space-y-2.5">
              <Label htmlFor="particulars">Particulars</Label>
              <Textarea
                id="particulars"
                maxLength={180}
                placeholder="eg. Please make the cover page portrait and single page, and the rest of the pages back to back."
                className="h-32 md:h-24"
                defaultValue={order.particulars ?? ""}
                onChange={(e) => {
                  setChanged(true)
                  setData((prev) => {
                    prev.particulars = e.target.value
                    return prev
                  })
                }}
              />
            </div>

            <div className="grid space-y-2.5 flex-shrink">
              <Label htmlFor="name">Number of Copies</Label>
              <Input
                className="bg-transparent h-24 aspect-square text-3xl text-right pr-4"
                id="num_copies"
                type="number"
                defaultValue={order.num_of_copies}
                onChange={(e) => {
                  setChanged(true)
                  setData((prev) => {
                    prev.num_of_copies = Number(e.target.value)
                    setCost(getTentativeCost(prev))
                    return prev
                  })
                }}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center ">
          <Button
            className=""
            variant="outline"
            disabled={!changed}
            type="submit"
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

function PhotoAlert({ tentative_cost }: { tentative_cost: number }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span className="cursor-pointer text-lg font-normal text-muted-foreground">
          <Badge className="text-lg" variant={"outline"}>
            {formatCurrency(tentative_cost * 100)}
          </Badge>
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>Please Note</AlertDialogHeader>

        <AlertDescription>
          Edits are locked after printout is done!
        </AlertDescription>
        <AlertDialogCancel>Ok</AlertDialogCancel>
        {/* <AlertDialogFooter>Photocopy</AlertDialogFooter> */}
      </AlertDialogContent>
    </AlertDialog>
  )
}
