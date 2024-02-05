import { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Register } from "./register"
import Overview from "./overview"

import { auth } from "@/auth"
import SelectDate from "@/components/dashboard/transactions/select-date"
import { fetchStudentDashData, fetchWeeklyExpense } from "@/lib/data"
import { notFound } from "next/navigation"
import Pending from "./pending"

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

  return (
    <>
      <div className="flex-col  md:flex">
        <div className="">
          <Tabs defaultValue="pending" className=" space-y-4">
            <div className="flex flex-row justify-between items-center">
              <TabsList>
                <TabsTrigger value="pending">
                  Pending <span className="hidden">Orders</span>
                </TabsTrigger>
                <TabsTrigger value="printed">
                  Printed <span className="hidden">Orders</span>
                </TabsTrigger>
                <TabsTrigger value="overview" className="gap-2">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="overview">
              <Overview />
            </TabsContent>
            <TabsContent
              value="register"
              className="flex flex-col h-4/5  space-y-4"
            >
              <SelectDate
                buttonClassName="w-min text-muted-foreground"
                className=" md:hidden"
              />
              <Register
                searchParams={searchParams}
                regd_no={authData.user.regd_no}
              />
            </TabsContent>
            <TabsContent value="pending">
              <Pending />
            </TabsContent>
            <TabsContent value="printed"></TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}

// https://www.codeconcisely.com/posts/nextjs-app-router-api-download-file/
