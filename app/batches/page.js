import Sidebar
from "../components/Sidebar";

import BatchCard
from "../components/BatchCard";

const batches = [
  {
    title:
      "Maths Batch 2 (Evening)",
    faculty:
      "Ramesh Sir",
    timing:
      "6 PM - 8 PM",
    price: 2999
  },
  {
    title:
      "Physics Batch",
    faculty:
      "Suresh Sir",
    timing:
      "7 PM - 9 PM",
    price: 3499
  },
  {
    title:
      "Chemistry Batch",
    faculty:
      "Mahesh Sir",
    timing:
      "5 PM - 7 PM",
    price: 2999
  }
];

export default function Batches() {
  return (
    <div className="layout">

      <Sidebar />

      <div className="content">

        <h1>
          Available Batches
        </h1>

        <div className="batch-grid">

          {batches.map(
            (batch, index) => (
              <BatchCard
                key={index}
                {...batch}
              />
            )
          )}

        </div>

      </div>

    </div>
  );
}