import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/investors/redressal-through-common-odr-portal");

export default function Layout({ children }) {
  return children;
}
