"use client"

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import React, { useEffect } from "react"
import { addDays, format } from "date-fns"
import { cn } from "@/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import NoWorkResult from "postcss/lib/no-work-result"

export default function DatePickerWithRange({
  className,
  buttonClassName,
}: React.HTMLAttributes<HTMLDivElement> & { buttonClassName?: string }) {
  // const [date, setDate] = React.useState<DateRange | undefined>({
  //   from: new Date(2022, 0, 20),
  //   to: addDays(new Date(2022, 0, 20), 20),
  // })

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: searchParams.get("dateFrom")
      ? new Date(searchParams.get("dateFrom") as string)
      : undefined,
    to: searchParams.get("dateTo")
      ? new Date(searchParams.get("dateTo") as string)
      : undefined,
  })

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    params.set("page", "1")
    if (date?.from) {
      params.set("dateFrom", date.from.toDateString())
      if (!date?.to) {
        params.set("dateTo", date.from.toDateString())
      } else {
        params.set("dateTo", date.to.toDateString())
      }
    } else {
      params.delete("dateFrom")
      params.delete("dateTo")
    }

    replace(`${pathname}?${params.toString()}`) // updates the URL with the user's search data
    // URL is updated without reloading the page, client-side navigation Supremacy
  }, [date])

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
              buttonClassName
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(date) => {
              setDate(date)
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
