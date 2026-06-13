import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <HeroSection />

      <section className="exam-section">
        <h2>Programs We Offer</h2>

        <div className="exam-grid">
          <Link href="/programs" className="exam-card">
            JEE Main & Advanced
          </Link>

          <Link href="/programs" className="exam-card">
            NEET
          </Link>

          <Link href="/programs" className="exam-card">
            AP EAMCET
          </Link>

          <Link href="/programs" className="exam-card">
            BITSAT
          </Link>

          <Link href="/programs" className="exam-card">
            COMEDK
          </Link>

          <Link href="/programs" className="exam-card">
            UGEE
          </Link>

          <Link href="/programs" className="exam-card">
            IISER
          </Link>

          <Link href="/programs" className="exam-card">
            IIT Foundation
          </Link>

          <Link href="/programs" className="exam-card">
            Class 10 Boards
          </Link>
        </div>
      </section>

      <section className="why-us">
        <h2>Why Vidya Vikas Academy?</h2>

        <div className="features">
          <div className="feature">
            Expert Physics Faculty
          </div>

          <div className="feature">
            Expert Chemistry Faculty
          </div>

          <div className="feature">
            Live Interactive Classes
          </div>

          <div className="feature">
            Daily Practice Tests
          </div>

          <div className="feature">
            Personalized Mentoring
          </div>

          <div className="feature">
            Competitive Exam Focus
          </div>
        </div>
      </section>
    </>
  );
}