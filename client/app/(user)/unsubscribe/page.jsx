import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";
import UnsubscribeClientPage from "./unsubscribe-client";

export const metadata = getStaticPageMetadata("/unsubscribe");

export default function UnsubscribePage() {
  return <UnsubscribeClientPage />;
}
