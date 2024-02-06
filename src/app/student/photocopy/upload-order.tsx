"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import {  uploadOrderFile } from "@/lib/actions"
import { UploadCloudIcon } from "lucide-react"
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

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files[0].type)
      if(e.target.files[0].type == "application/pdf") {
        const numPages = await getPageCount(e.target?.files[0])
        setPageCount(numPages)
      }
    }
  }

  return (
    <form
      className="flex flex-col justify-between gap-2"
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
      <div className="flex flex-row gap-3 items-center">
        <Input
          id="file"
          name="file"
          type="file"
          onChange={handleFileChange}
          className="h-12 flex flex-row "
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
    <Button
      variant={"default"}
      className="w-min h-12 space-x-2"
      aria-disabled={pending}
    >
      <span>Upload</span> <UploadCloudIcon className="ml-auto h-5 w-5" />
    </Button>
  )
}
