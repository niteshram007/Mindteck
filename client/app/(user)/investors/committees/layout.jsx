import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/investors/committees");

export default function Layout({ children }) {
  return children;
}
