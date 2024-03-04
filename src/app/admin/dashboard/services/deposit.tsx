"use client"
import Search from "@/components/search"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { users } from "@prisma/client"
import React from "react"

export default function Deposit({
  students,
  isSearching,
}: {
  students: users[]
  isSearching: boolean
}) {
  const [init, setInit] = React.useState(true)
  return (
    <form>
      <Card>
        <CardHeader>Deposit Cash</CardHeader>
        <CardDescription className="px-6">
          enter transaction details
        </CardDescription>
        <CardContent className="p-6">
          <div className="flex flex-col mb-4">
            <div className="relative flex flex-row justify-between items-center gap-2">
              <Search query="depositq" placeholder="search Student" />
              {isSearching?
              <div className="absolute top-14 rounded-lg dark:bg-neutral-950/75 backdrop-blur p-2 w-full">
              </div>: null
              }
              <div className="rounded-full h-12 w-12 border-neutral-800 border dark:bg-neutral-900"></div>
            </div>
          </div>
          <div className="dark:bg-neutral-900 rounded-lg w-full h-48 flex flex-row">
            <div className="m-auto text-xs dark:text-neutral-600">
              search for a student to begin
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
