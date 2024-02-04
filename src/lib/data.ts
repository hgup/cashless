import { RecentTransactions } from "@/components/student/recent-transactions"
import { unstable_noStore as noStore } from "next/cache"
import prisma from "@/lib/db"
import { Dept, Prisma, Room, UserRoles, subscriptions } from "@prisma/client"
import { format } from "date-fns"

export type RoomWithRelations = Prisma.roomsGetPayload<{
  include: {
    subscriptions: { include: { details: true } }
    room_leaders: { include: { profile: true } }
    members: true
  }
}>

export type SubscriptionWithDetails = Prisma.subscriptionsGetPayload<{
  include: { details: true }
}>

const ITEMS_PER_PAGE = 8

// STUDENTS
export async function fetchStudentById(id: string) {
  noStore()

  try {
    const student = await prisma.users.findUnique({
      where: {
        regd_no: id,
      },
    })
    return student
  } catch (err) {
    console.error("Database Error:", err)
    throw new Error("Failed to fetch this student.")
  }
}

export async function fetchStudentPages(query: string) {
  noStore()
  try {
    const count = (await prisma.users.count({
      where: {
        OR: [
          {
            name: {
              contains: `%${query}%`,
            },
          },
          {
            roll_no: {
              contains: `%${query}%`,
            },
          },
          {
            class: {
              contains: `%${query}%`,
            },
          },
        ],
      },
    })) as Number
    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to Fetch total number of Student Pages")
  }
}

export async function fetchFilteredStudents(
  query: string,
  currentPage: number
) {
  noStore()
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  try {
    const students = await prisma.users.findMany({
      where: {
        AND: [
          // {},
          {
            OR: [
              {
                name: {
                  contains: `%${query}%`,
                },
              },
              {
                roll_no: {
                  contains: `%${query}%`,
                },
              },
              {
                class: {
                  contains: `%${query}%`,
                },
              },
            ],
          },
        ],
      },
      orderBy: {
        roll_no: "asc",
      },
      skip: offset,
      take: ITEMS_PER_PAGE,
    })
    return students
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch students")
  }
}

// ROOMS
export async function fetchRooms(currentPage: number) {
  noStore()
  const offset = (currentPage - 1) * 8
  try {
    const rooms: RoomWithRelations[] = await prisma.rooms.findMany({
      include: {
        room_leaders: {
          include: {
            profile: true,
          },
        },
        members: true,
        subscriptions: {
          include: {
            details: true,
          },
        },
      },
      skip: offset,
      take: 8,
    })
    return rooms
  } catch (error) {
    console.error("Failed to fetch rooms", error)
  }
}

export async function fetchRoomById(id: Room) {
  noStore()

  try {
    const room = await prisma.rooms.findUnique({
      where: {
        room_no: id,
      },

      include: {
        members: true,
        subscriptions: {
          include: {
            details: true,
          },
        },
        room_leaders: {
          include: {
            profile: true,
          },
        },
      },
    })
    return room
  } catch (err) {
    console.error("Database Error:", err)
    throw new Error("Failed to fetch this student.")
  }
}

// TRANSACTIONS
export async function fetchFilteredTransactions(
  query: string,
  dateFrom: string,
  dateTo: string,
  currentPage: number,
  regd_no?: string
) {
  noStore()
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  const timestart = new Date(dateFrom)
  const timeend = new Date(dateTo)
  timeend.setHours(23, 59, 59)

  try {
    const transactions = await prisma.transactions.findMany({
      where: {
        AND: [
          {
            regd_no: regd_no ?? undefined,
          },
          {
            date: !!dateFrom
              ? dateFrom === dateTo
                ? { lte: timeend, gte: timestart }
                : {
                    lte: dateTo ? timeend : undefined,
                    gte: dateFrom ? timestart : undefined,
                  }
              : undefined,
          },

          {
            OR: [
              {
                regd_no: {
                  contains: `%${query}%`,
                },
              },
              {
                student: {
                  name: {
                    contains: `%${query}%`,
                  },
                },
              },
              {
                particulars: {
                  contains: `%${query}%`,
                },
              },
            ],
          },
        ],
      },
      orderBy: {
        date: "desc",
      },
      skip: offset,
      take: ITEMS_PER_PAGE,
      include: {
        student: {
          select: {
            name: true,
            photo: true,
          },
        },
      },
    })
    return transactions
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to Fetch Transaction Pages")
  }
}

export async function fetchTransactionPages(
  query: string,
  dateFrom: string,
  dateTo: string,
  regd_no?: string,
  dept?: Dept
) {
  noStore()
  const timestart = new Date(dateFrom)
  const timeend = new Date(dateTo)
  timeend.setHours(23, 59, 59)

  try {
    const count = (await prisma?.transactions.count({
      where: {
        AND: [
          {
            regd_no: regd_no ?? undefined,
            date: !!dateFrom
              ? dateFrom === dateTo
                ? { lte: timeend, gte: timestart }
                : {
                    lte: dateTo ? timeend : undefined,
                    gte: dateFrom ? timestart : undefined,
                  }
              : undefined,
          },

          {
            OR: [
              {
                regd_no: {
                  contains: `%${query}%`,
                },
              },
              {
                student: {
                  name: {
                    contains: `%${query}%`,
                  },
                },
              },
              {
                particulars: {
                  contains: `%${query}%`,
                },
              },
            ],
          },
        ],
      },
    })) as Number

    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to Fetch total number of Transaction Pages")
  }
}

export async function fetchRecentTransactions(regd: string) {
  noStore()
  const transactions = await prisma?.transactions.findMany({
    where: {
      regd_no: regd,
    },
    orderBy: {
      date: "desc",
    },
    take: 5,
  })
  return transactions
}

export async function fetchWeeklyExpense(
  regd: string
): Promise<{ day: string; expense: number }[]> {
  const lastweek = new Date(new Date().setUTCDate(new Date().getUTCDate() - 7))

  const expenses = (await prisma.$queryRaw`
    SELECT date(date) as day, SUM(amount) as expense 
    FROM transactions where regd_no=${regd} && amount < 0
    GROUP BY day having day >= ${lastweek} ORDER BY day`) as {
    day: Date
    expense: number
  }[]

  const formattedExpenses = expenses.map((point) => ({
    day: format(point.day, "EEE"),
    expense: -point.expense / 100,
  }))
  return formattedExpenses
}

export async function fetchHighlightsInfo(regd: string) {
  const last2lastweek = new Date(
    new Date().setUTCDate(new Date().getUTCDate() - 14)
  )
  const lastweek = new Date(new Date().setUTCDate(new Date().getUTCDate() - 7))
  const last_week_spent = prisma?.transactions.aggregate({
    where: {
      regd_no: regd,
      date: {
        lte: lastweek,
        gte: last2lastweek,
      },
      amount: {
        lt: 0,
      },
    },
    _sum: {
      amount: true,
    },
  })

  const this_week_spent = prisma?.transactions.aggregate({
    where: {
      regd_no: regd,
      date: {
        gte: lastweek,
      },
      amount: {
        lt: 0,
      },
    },
    _sum: {
      amount: true,
    },
  })

  const sub_details = prisma?.users.findUnique({
    where: {
      regd_no: regd,
    },
    select: {
      room: {
        select: {
          subscriptions: {
            select: {
              details: true,
            },
          },
          _count: true,
        },
      },
    },
  })

  const total_transactions = prisma?.transactions.count({
    where: {
      regd_no: regd,
    },
  })

  const [lw_spent, tw_spent, sb, tt] = await Promise.all([
    last_week_spent,
    this_week_spent,
    sub_details,
    total_transactions,
  ])

  let sub_cost = 0
  sb?.room?.subscriptions.forEach((sub) => {
    sub_cost += sub.details.amount
  })
  sub_cost = sub_cost / Number(sb?.room?._count.members)
  let sub_number
  // update later
  // const subscription_fee =

  return [
    lw_spent?._sum?.amount,
    tw_spent._sum.amount,
    sub_cost,
    tt,
    sub_number,
  ]
}

export async function fetchStudentDashData(regd: string) {
  const lastmonth = new Date(
    new Date().setUTCDate(new Date().getUTCDate() - 30)
  )
  const this_month_count = await prisma?.transactions.count({
    where: {
      regd_no: regd,
      date: {
        gte: lastmonth,
      },
    },
  })
  return this_month_count
}

export async function fetchNewPhotocopyOrders(regd: string) {
  const orders = await prisma?.photocopy_register.findMany({
    where: {
      regd_no: regd,
    },
  })
  return orders
}
