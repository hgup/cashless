import { cn, formatCurrency } from "@/lib/utils"
import clsx from "clsx"

export const TransactedAmount = ({ amount }: { amount: number }) => (
  <span
    className={clsx("text-green-700", {
      "text-red-700": amount < 0,
    })}
  >
    {formatCurrency(amount)}
  </span>
)
