"use client";
import useUrlParams from "@/lib/hooks/use-url-params"

export default function OverviewClient() {
  useUrlParams("t", "overview")
  return <></>
}
