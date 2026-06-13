import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="sidebar">

      <h2>VVA</h2>

      <Link href="/dashboard">
        Dashboard
      </Link>

      <Link href="/programs">
        Programs
      </Link>

      <Link href="#">
        Live Classes
      </Link>

      <Link href="#">
        Announcements
      </Link>

      <Link href="#">
        My Enrollments
      </Link>

      <Link href="#">
        Profile
      </Link>

    </div>
  );
}