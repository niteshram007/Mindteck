import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/investors/stock-exchange-filings");

export default function Layout({ children }) {
  return children;
}
