import Footer from "../Footer";

export default function UserLayout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
