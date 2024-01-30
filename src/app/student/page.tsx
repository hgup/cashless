import { Metadata } from "next"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "@/components/student/date-range-picker"
import { Overview } from "@/components/student/overview"
import { RecentTransactions } from "@/components/student/recent-transactions"
import { Transactions, PendingTransactions } from "./transactions"
import { Highlights } from "./hightlights"
import { auth } from "@/auth"
import SelectDate from "@/components/dashboard/transactions/select-date"
import { fetchWeeklyExpense } from "@/lib/data"
import { notFound } from "next/navigation"

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
  }
}) {
  const authData = await auth()
  if (!authData?.user) {
    notFound()
  }
  const expenses = await fetchWeeklyExpense(authData?.user.regd_no)

  return (
    <>
      <div className="flex-col h-full md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="grid h-full gap-4 lg:gap-8 md:grid-cols-1 lg:grid-cols-4">
            {/* Dashboard region */}
            <div className="lg:col-span-3 h-full space-y-4 ">
              <h2 className="text-3xl font-bold ">
                Welcome back, {authData?.user.name.split(" ")[0]}
              </h2>
              <Tabs defaultValue="overview" className=" space-y-4">
                <div className="flex flex-row justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  </TabsList>

                  <SelectDate
                    buttonClassName="w-min text-muted-foreground"
                    className=" md:hidden"
                  />
                </div>
                <TabsContent
                  value="overview"
                  className="flex flex-col h-4/5  space-y-4"
                >
                  {/* Highlights */}
                  <Highlights />
                  {/* Overview graph and recent transactions */}
                  <div className="flex-grow grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="lg:col-span-3">
                      <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                        <CardDescription>
                          You made 265 transactions this month.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <RecentTransactions authdata={authData} />
                      </CardContent>
                    </Card>

                    <Card className="lg:col-span-4">
                      <CardHeader>
                        <CardTitle>Expenses </CardTitle>
                        <CardDescription>This week your spent</CardDescription>
                      </CardHeader>
                      <CardContent className="pl-2">
                        <Overview data={expenses} />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent
                  value="transactions"
                  className="flex flex-col h-4/5  space-y-4"
                >
                  <Transactions searchParams={searchParams} />
                </TabsContent>
              </Tabs>
            </div>
            {/* Pending Transactions */}
            <div className="lg:col-span-1  ">
              <PendingTransactions />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
