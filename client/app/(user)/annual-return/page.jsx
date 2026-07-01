import { permanentRedirect } from "next/navigation";

export default function AnnualReturnRedirectPage() {
  permanentRedirect("/investors/annual-return");
}
