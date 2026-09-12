import Navbar from "../Navbar/Navbar";
import "./Layout.css";

function Layout({ children }) {
  return (
    <>
      <Navbar />

      <main className="layout">
        {children}
      </main>
    </>
  );
}

export default Layout;