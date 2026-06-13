import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        Vidya Vikas Academy
      </div>

      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/programs">Programs</Link>
      </div>
    </nav>
  );
}