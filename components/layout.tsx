// import-slot
// end-import-slot

import { ReactNode } from "react";
import Header from "./templates/headers/header1";
import Footer from "./templates/footers/footer1";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
