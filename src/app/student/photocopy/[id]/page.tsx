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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { PrintDuplexity, PrintLayout, PrintOrientations } from "@prisma/client"
import {
  NotionLogoIcon,
  ViewGridIcon,
  ViewHorizontalIcon,
  ViewVerticalIcon,
} from "@radix-ui/react-icons"
import {
  Book,
  Check,
  FlipVertical,
  GripHorizontal,
  MoreVertical,
  MoveHorizontal,
  MoveHorizontalIcon,
  MoveVertical,
  SheetIcon,
} from "lucide-react"

export default async function PhotocopyEdit({
  params,
}: {
  params: { id: string }
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="grow mt-5">
        <CardTitle className="flex flex-row text-xl justify-between px-5 items-center">
          Edit Order Details <PhotoAlert />
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="grow grid gap-6 md:px-20">
        <div className="grid gap-6 md:gap-20 grid-cols-1 lg:grid-cols-2">
          <div className="mb-2">
            <h3 className="mb-2">Print Orientation</h3>
            <RadioGroup
              defaultValue={PrintOrientations.AS_IT_IS}
              className="grid-flow-row grid grid-cols-2 gap-4"
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
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
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
                defaultValue={PrintOrientations.AS_IT_IS}
                className="grid-flow-row grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value={PrintDuplexity.SINGLE}
                    id="single-side"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="single-side"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <ViewHorizontalIcon className="mb-3 h-6 w-6" />
                    Single Side
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value={PrintOrientations.BEST_FIT}
                    id="back-to-back"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="back-to-back"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Check className="mb-3 h-6 w-6" />
                    Back To Back
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
                id="specify-pages"
                placeholder="eg. 2-14,23,25,36-40"
              />
            </div>
            <h3 className="mb-2 mt-0.5">Print Layout</h3>
            <RadioGroup
              defaultValue={PrintLayout.AS_IT_IS}
              className="grid-flow-row grid grid-cols-2 gap-4"
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
                  <SheetIcon className="mb-3 h-6 w-6" />
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
                  <NotionLogoIcon className="mb-3 h-6 w-6" />
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
                  <NotionLogoIcon className="mb-3 h-6 w-6" />
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
                  <NotionLogoIcon className="mb-3 h-6 w-6" />
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
              className="h-24"
            />
          </div>

          <div className="grid space-y-2.5 flex-shrink">
            <Label htmlFor="name">Number of Copies</Label>
            <Input
              className="bg-transparent h-24 aspect-square text-3xl text-right pr-4"
              id="num_copies"
              type="number"
              defaultValue={1}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center ">
        <Button className="" type="submit">
          Continue
        </Button>
      </CardFooter>
    </Card>
  )
}

function PhotoAlert() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span className="cursor-pointer text-md font-normal text-muted-foreground">
          more info
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
