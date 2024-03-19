import useUrlParams from "@/lib/hooks/use-url-params"

export default function RegisterClient() {
  useUrlParams("t", "register")
  return <></>
}
