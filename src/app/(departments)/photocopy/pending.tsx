import Search from "@/components/search"
// import { CreateStudent } from "./buttons"
import { Suspense } from "react"
import { StudentsTableSkeleton } from "@/components/skeletons"
import Pagination from "@/components/pagination"
import { fetchPendingOrders, fetchPhotocopyRegisterPages } from "@/lib/data"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SelectDate from "@/components/dashboard/transactions/select-date"
import { Dept } from "@prisma/client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { rejectOrderWithId } from "@/lib/actions"
import { Ban } from "lucide-react"
import clsx from "clsx"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import React from "react"
import PendingClient from "./pending-client"

export const revalidate = 0

export default async function Pending({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
    dateTo?: string
    dateFrom?: string
  }
}) {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const dateFrom = searchParams?.dateFrom || ""
  const dateTo = searchParams?.dateTo || ""

  const totalPages = await fetchPhotocopyRegisterPages(
    query,
    dateFrom,
    dateTo,
    "PENDING"
  ) // 12/6 = 2

  const orders = await fetchPendingOrders(query, dateFrom, dateTo, currentPage)

  return (
    <div className="flex flex-col  max-w-[900px] mx-auto">
      <div>
        <div className="flex  flex-col items-center gap-2 ">
          <Search className="grow w-full mb-4" placeholder="Search Entries" />
        </div>
        <div className="">
          <Suspense key={query} fallback={<span>Loading</span>}>
            <PendingClient query={query} orders={orders} />
          </Suspense>
        </div>
      </div>
      <div className="mt-4 row-start-3 flex w-full justify-center"></div>
    </div>
  )
}

export function PendingTransactions() {
  const pending: any = undefined
  return (
    <Card className=" space-y-4">
      <CardHeader>
        <CardTitle className="text-center font-bold text-xl">
          Pending Transactions
        </CardTitle>
        <CardDescription className="text-center">
          Approve Transactions here
        </CardDescription>
      </CardHeader>

      <CardContent className="pl-2 flex flex-col items-center">
        <span className="text-muted-foreground text-center w-full text-s">
          No pending transactions
        </span>
      </CardContent>
    </Card>
  )
}
