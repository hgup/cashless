import { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Register } from "./register"
import Overview from "./overview"

import { auth } from "@/auth"
import SelectDate from "@/components/dashboard/transactions/select-date"
import {
  fetchStudentDashData,
  fetchWeeklyExpense,
  areThereNewOrders,
} from "@/lib/data"
import { notFound } from "next/navigation"
import Pending from "./pending"
import Printed from "./printed"
import RefreshButton from "./refresh-button"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
    dateTo?: string
    dateFrom?: string
    t?: string
  }
}) {
  const authData = await auth()
  if (!authData?.user) {
    notFound()
  }

  const tab = searchParams?.t || "overview"
  const [expenses, this_month_count, isPending] = await Promise.all([
    fetchWeeklyExpense(authData?.user.regd_no),
    fetchStudentDashData(authData?.user.regd_no),
    areThereNewOrders(),
  ])

  return (
    <>
      <div className="flex-col pt-12 md:flex">
        <div className="  max-w-[900px] w-full mx-auto">
          <Tabs defaultValue={tab} className="  space-y-4">
            <div className="flex flex-row justify-between items-center">
              <TabsList>
                <TabsTrigger value="overview" className="gap-2">
                  Overview
                </TabsTrigger>
                <TabsTrigger className="relative" value="pending">
                  {isPending ? (
                    <span className="absolute -top-1 -right-1">
                      <span className="relative top-0 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                      </span>
                    </span>
                  ) : null}
                  <span className="mr-1">Pending</span>{" "}
                  <span className="hidden md:block">Orders</span>
                </TabsTrigger>
                <TabsTrigger value="printed">
                  <span className="mr-1">Printed</span>{" "}
                  <span className="hidden md:block">Orders</span>
                </TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <RefreshButton />
            </div>
            <TabsContent value="overview">
              <Overview />
            </TabsContent>
            <TabsContent
              value="register"
              className="flex flex-col h-4/5  space-y-4"
            >
              <SelectDate
                buttonClassName="w-full text-muted-foreground"
                className="md:hidden"
              />
              <Register
                searchParams={searchParams}
                regd_no={authData.user.regd_no}
              />
            </TabsContent>
            <TabsContent value="pending">
              <Pending searchParams={searchParams} />
            </TabsContent>
            <TabsContent value="printed">
              <Printed searchParams={searchParams} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}

// https://www.codeconcisely.com/posts/nextjs-app-router-api-download-file/
