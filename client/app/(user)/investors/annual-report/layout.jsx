import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/investors/annual-report");

export default function Layout({ children }) {
  return children;
}
