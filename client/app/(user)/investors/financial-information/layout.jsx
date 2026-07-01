import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/investors/financial-information");

export default function Layout({ children }) {
  return children;
}
