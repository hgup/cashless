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
import { fetchStudentDashData, fetchWeeklyExpense } from "@/lib/data"
import { notFound } from "next/navigation"
import EasterEgg from "@/components/student/easter-egg"

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
  const [expenses, this_month_count] = await Promise.all([
    fetchWeeklyExpense(authData?.user.regd_no),
    fetchStudentDashData(authData?.user.regd_no),
  ])

  const firstName = authData?.user.name.split(" ").shift()?.concat()

  return (
    <>
      {/* <div className="flex-col  lg:px-14 lg:py-6 lg:pt-10 md:flex space-y-4 px-8 pt-4 h-full"> */}
      <div className="flex-col   md:flex space-y-4 px-3 pt-7 h-full lg:py-6 lg:px-14 lg:pt-10">
        <div className="grid h-full gap-4 lg:gap-8 md:grid-cols-1 lg:grid-cols-4">
          {/* Dashboard region */}
          <div className="lg:col-span-3 h-full space-y-4 ">
            <h2 className="text-3xl font-bold lg:mt-10 mt-16 mb-7 text-center lg:text-left">
              Welcome back, {firstName}
            </h2>
            <Tabs defaultValue="overview" className="">
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
              <TabsContent value="overview" className="flex flex-col space-y-3">
                {/* Highlights */}
                <Highlights regd={authData.user.regd_no} />
                {/* Overview graph and recent transactions */}
                <div className="flex-grow grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>Recent Transactions</CardTitle>
                      <CardDescription>
                        You made {this_month_count}
                        {this_month_count == 1
                          ? " transaction "
                          : " transactions "}
                        this month.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <RecentTransactions authdata={authData} />
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-4 pl-0">
                    <CardHeader>
                      <CardTitle>Expenses </CardTitle>
                      <CardDescription>This week your spent</CardDescription>
                    </CardHeader>
                    <CardContent className="lg:pl-2 pl-0">
                      <Overview data={expenses} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent
                value="transactions"
                className="flex flex-col h-full  space-y-4"
              >
                <Transactions
                  searchParams={searchParams}
                  regd_no={authData.user.regd_no}
                />
              </TabsContent>
            </Tabs>
          </div>
          {/* Pending Transactions */}
          <div className="lg:col-span-1 mt-10 pb-2">
            <PendingTransactions />
          </div>
        </div>
      </div>
    </>
  )
}
