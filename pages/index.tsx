import LandingPage from "@/components/LandingPage";
import { SignUpManagementProvider } from "@/utils/context/SignUpMangement";

export default function Home() {
  return (
    <>
      <SignUpManagementProvider />
    </>
  )
}
