import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="hero">

      <div className="hero-content">

        <h1>
          Crack JEE, NEET, EAMCET,
          BITSAT & UGEE with
          Expert Guidance
        </h1>

        <p>
          Physics & Chemistry Excellence
          for Competitive Exams
        </p>

        <div className="hero-buttons">

          <Link
            href="/programs"
            className="hero-btn"
          >
            Enroll Now
          </Link>

          <Link
            href="/programs"
            className="hero-btn secondary"
          >
            Explore Programs
          </Link>

        </div>

      </div>

    </section>
  );
}