export default function ProgramCard({
  title,
  description,
  price,
  category,
}) {
  return (
    <div className="program-card">

      <span className="program-category">
        {category}
      </span>

      <h3>{title}</h3>

      <p>{description}</p>

      <div className="program-footer">

        <strong>
          ₹{price}
        </strong>

        <button>
          Enroll Now
        </button>

      </div>

    </div>
  );
}