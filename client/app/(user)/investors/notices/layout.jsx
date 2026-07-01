import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/investors/notices");

export default function Layout({ children }) {
  return children;
}
