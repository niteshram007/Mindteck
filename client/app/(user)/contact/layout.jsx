import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/contact");

export default function Layout({ children }) {
  return children;
}
