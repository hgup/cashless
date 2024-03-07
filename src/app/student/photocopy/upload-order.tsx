"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { uploadOrderFile } from "@/lib/actions"
import { Loader2, PanelTopClose, UploadCloudIcon } from "lucide-react"
import { useFormState, useFormStatus } from "react-dom"
import { PDFDocument } from "pdf-lib"
import React from "react"

export default function UploadOrder({ regd_no }: { regd_no: string }) {
  const { toast } = useToast()
  const uploadOrderFileWithId = uploadOrderFile.bind(null, regd_no)
  const [errorMessage, dispatch] = useFormState(
    uploadOrderFileWithId,
    undefined
  )
  const [pageCount, setPageCount] = React.useState(0)

  const readFile = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)

      reader.readAsArrayBuffer(file)
    })
  }

  const getPageCount = async (file: any) => {
    const arrayBuffer = await readFile(file)

    const pdf = await PDFDocument.load(arrayBuffer as ArrayBuffer)

    return pdf.getPageCount()
  }

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      console.log(e.target.files[0].type)
      if (e.target.files[0].type == "application/pdf") {
        const numPages = await getPageCount(e.target?.files[0])
        setPageCount(numPages)
      }
    }
  }

  return (
    <form
      className="flex flex-col w-full justify-between gap-2"
      action={async (formData) => {
        formData.set("file_pages", pageCount.toString())
        dispatch(formData)
        console.log(errorMessage)
        if (
          errorMessage !== undefined &&
          !errorMessage?.toLowerCase().includes("fail")
        ) {
          toast({
            className: "text-xl dark:bg-stone-700 bg-emerald-200",
            title: "Successful Operation!",
            description: `Placed Order. Specify your order details now.`,
          })
          const fileinput = document.getElementById("file") as HTMLInputElement
          fileinput.files = null
        }
      }}
    >
      <div className="flex flex-row gap-3">
        <input
          id="file"
          name="file"
          type="file"
          onChange={handleFileChange}
          className="h-12 flex w-full flex-row 
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-secondary dark:file:text-sky-400 file:text-sky-700
      hover:file:bg-sky-500 hover:file:text-secondary-foreground hover:file:text-white dark:hover:file:text-white transition-all duration-300"
        />
        <SubmitButton />
      </div>
      {errorMessage ? (
        <span className="text-sm pl-2 text-red-500">{errorMessage}</span>
      ) : null}
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className="flex flex-row gap-2 w-min h-min ml-4 py-2 px-4 rounded-full border-0 text-sm font-semibold bg-violet-50 text-sky-800 hover:bg-violet-100"
      aria-disabled={pending}
    >
      <span>Order</span>{" "}
      {!pending ? (
        <PanelTopClose className=" h-5 w-5" />
      ) : (
        <Loader2 className="h-5 w-5 animate-spin" />
      )}
    </button>
  )
}
