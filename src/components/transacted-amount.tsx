import { cn, formatCurrency } from "@/lib/utils"
import clsx from "clsx"

export const TransactedAmount = ({ amount }: { amount: number }) => (
  <span
    className={clsx("text-green-700 dark:text-green-500", {
      "text-red-700 dark:text-red-500": amount < 0,
    })}
  >
    {formatCurrency(amount)}
  </span>
)
