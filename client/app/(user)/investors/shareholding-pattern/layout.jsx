import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/investors/shareholding-pattern");

export default function Layout({ children }) {
  return children;
}
