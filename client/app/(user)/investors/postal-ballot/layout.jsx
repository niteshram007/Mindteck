import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/investors/postal-ballot");

export default function Layout({ children }) {
  return children;
}
