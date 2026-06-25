import ProgramCard from "../components/ProgramCard";
import { getPrograms } from "../../lib/program-service";

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <div className="page-container">
      <h1>Programs</h1>

      <p>
        Physics & Chemistry Excellence for Competitive Exams
      </p>

      <div className="program-grid">
        {programs.map((program) => (
          <ProgramCard
            id={program.id}
            key={program.id}
            title={program.title}
            description={program.description}
            price={program.price}
            category={program.category}
          />
        ))}
      </div>
    </div>
  );
}