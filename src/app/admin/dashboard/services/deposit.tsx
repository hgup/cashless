"use client"
import RegdBadge from "@/components/dashboard/regd-badge"
import Search from "@/components/search"
import StudentAvatar from "@/components/student-avatar"
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
import { depositMoneyToId } from "@/lib/actions-transaction"
import { formatCurrency } from "@/lib/utils"
import type { users } from "@prisma/client"
import { IndianRupee } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React from "react"
import { isRegExp } from "util/types"

export default function Deposit({
  students,
  isSearching,
  selectedStudent,
}: {
  students: { regd_no: string; name: string }[]
  isSearching: boolean
  selectedStudent: users | null
}) {
  const [selected, setSelected] = React.useState<string>("")
  const [amount, setAmount] = React.useState<string>("")
  const [particulars, setParticulars] = React.useState<string>("")

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const handleSelect = (regd_no: string) => {
    const params = new URLSearchParams(searchParams)
    params.delete("depositq")
    params.set("selectedStudent", regd_no)
    setSelected(regd_no)

    replace(`${pathname}?${params.toString()}`) // updates the URL with the user's search data
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const searchbar = document.getElementById("search") as HTMLInputElement
        const params = new URLSearchParams(searchParams)
        depositMoneyToId(selected, amount, particulars)
        params.delete("selectedStudent")
        params.delete("depositq")
        setSelected("")
        setAmount("")
        searchbar.value = ""
        searchbar.focus()
        replace(`${pathname}?${params.toString()}`) // updates the URL with the user's search data
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Deposit Cash</CardTitle>
          <CardDescription>to Student Cashless Account</CardDescription>
        </CardHeader>
        <CardContent className="">
          <div className="flex flex-col mb-4">
            <div className="relative flex flex-row justify-between items-center gap-2">
              <Search
                query="depositq"
                placeholder="search Student"
                handleEnter={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    if (students[0]) handleSelect(students[0].regd_no)
                  }
                }}
              />
              {isSearching ? (
                <ul className="absolute flex flex-col top-14 rounded-lg bg-neutral-200/75 dark:bg-neutral-950/75 backdrop-blur overflow-clip  w-full z-10">
                  {students.map((student, index) => (
                    <li
                      key={index}
                      className="dark:odd:bg-neutral-900/75 odd:bg-neutral-300/75"
                    >
                      <button
                        className="p-3 flex focus:bg-neutral-100 focus:text-black focus:font-semibold focus:outline-1 focus:outline-blue-400 focus:rounded-lg row justify-between w-full"
                        type="button"
                        onClick={() => {
                          setSelected(student.regd_no)
                          handleSelect(student.regd_no)
                        }}
                      >
                        {student.name}
                        <div>{student.regd_no}</div>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
          <div className="dark:bg-neutral-900 bg-neutral-100 rounded-lg w-full h-48 flex flex-row">
            {!!selectedStudent ? (
              <StudentDetails student={selectedStudent} />
            ) : (
              <div className="m-auto text-xs dark:text-neutral-600">
                search for a student to begin
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-row justify-end gap-5 h-16 md:my-5">
          <div className="h-full flex flex-row items-center">
            <IndianRupee className="translate-x-7 h-5 w-5" />
            <Input
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value)
              }}
              className="max-w-[100px] h-full text-right border-neutral-500 dark:border-neutral-400 outline-offset-2 border "
            />
          </div>
          <Button className="h-full" disabled={!selected}>
            Pay
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

function StudentDetails({ student }: { student: users }) {
  return (
    <div
      key={student.regd_no}
      // className="mb-2 w-full rounded-md dark:bg-stone-900 bg-white p-4"
      className="mb-2 p-5 w-full"
    >
      <div className="flex items-center justify-between border-b pb-4 w-full">
        <div className="w-full">
          <div className="flex flex-row justify-between w-full">
            <div className="mb-2 flex items-center gap-5">
              <StudentAvatar
                src={student.photo}
                className="w-10 h-10 md:w-16 md:h-16"
                name={student.name}
              />
              <div className="flex flex-col">
                <p className="text-semibold md:text-[20px]">{student.name}</p>
                <p className="text-md text-muted-foreground">{student.class}</p>
              </div>
            </div>

            <div className="flex flex-col gap-5 items-end">
              <RegdBadge regd_no={student.regd_no} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div className="flex justify-between w-full">
          <p className="md:text-xl text-lg font-medium">
            {formatCurrency(student.balance)}
          </p>

          <Badge variant="secondary" className="text-center w-min text-md">
            {student.room_no}
          </Badge>
        </div>
      </div>
    </div>
  )
}
