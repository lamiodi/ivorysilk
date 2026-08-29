import { redirect } from "next/navigation";

export default function OrderSuccessFallbackPage() {
  redirect("/shop");
}
