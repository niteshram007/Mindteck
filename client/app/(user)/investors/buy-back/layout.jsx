import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/investors/buy-back");

export default function Layout({ children }) {
  return children;
}
