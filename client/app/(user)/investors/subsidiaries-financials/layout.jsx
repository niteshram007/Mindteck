import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/investors/subsidiaries-financials");

export default function Layout({ children }) {
  return children;
}
