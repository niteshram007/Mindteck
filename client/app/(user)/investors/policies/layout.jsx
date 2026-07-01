import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/investors/policies");

export default function Layout({ children }) {
  return children;
}
