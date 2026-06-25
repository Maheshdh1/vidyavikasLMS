import Link from "next/link";
import { getProgram } from "../../../lib/program-details";

export default async function ProgramDetails({ params }) {
  const { id } = await params;

  const program = await getProgram(id);

  return (
    <div className="program-details">
      <h1>{program.title}</h1>

      <p>{program.description}</p>

      <div className="features-list">
        <p>✓ Evening Batch</p>
        <p>✓ Physics Classes</p>
        <p>✓ Chemistry Classes</p>
        <p>✓ Live Online Sessions</p>
        <p>✓ WhatsApp Notifications</p>
      </div>

      <h2>₹{program.price}</h2>

      <Link
        href={`/payment-test?programId=${program.id}`}
        className="hero-btn"
      >
        Enroll Now
      </Link>
    </div>
  );
}