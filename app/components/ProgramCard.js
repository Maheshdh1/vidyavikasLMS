import Link from "next/link";

export default function ProgramCard({
  title,
  description,
  price,
  category,
  id,
}) {
  return (
    <Link
      href={`/programs/${id}`}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div className="program-card">

        <span className="program-category">
          {category}
        </span>

        <h3>{title}</h3>

        <p>{description}</p>

        <div className="program-footer">
          <strong>₹{price}</strong>

          <button>
            View Details
          </button>
        </div>

      </div>
    </Link>
  );
}