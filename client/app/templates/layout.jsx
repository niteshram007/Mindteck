
import "../globals.css";
import "../style.css";
import { Toaster } from "@/components/ui/toaster";

export default function TemplateLayout({ children }) {
 
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
