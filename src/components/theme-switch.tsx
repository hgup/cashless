"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "./ui/switch"

// const useThemeSwitcher = () => {
//   const [mode, setMode] = useState("")
//   const { theme, setTheme } = useTheme()

//   useEffect(() => {
//     setMode(theme)
//   }, [theme])
//   return [mode, setTheme]
// }
export function ThemeModeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Switch
      checked={theme == "dark"}
      onCheckedChange={(e) => {
        if (e.valueOf()) {
          setTheme("dark")
        } else {
          setTheme("light")
        }
      }}
    />
  )
}
