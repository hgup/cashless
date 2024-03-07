import Search from "@/components/search"
// import { CreateStudent } from "./buttons"
import { Suspense } from "react"
import { fetchPrintedOrders, fetchPhotocopyRegisterPages } from "@/lib/data"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import React from "react"
import PrintedClient from "./printed-client"

export const revalidate = 0

export default async function Printed({
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

  const orders = await fetchPrintedOrders(query, dateFrom, dateTo, currentPage)

  return (
    <div className="flex flex-col ">
      <div>
        <div className="flex  flex-col items-center gap-2 pl-1">
          <Search className="grow w-full mb-2" placeholder="Search Entries" />
        </div>
        <div className="">
          <Suspense key={query} fallback={<span>Loading</span>}>
            <PrintedClient query={query} orders={orders} />
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
