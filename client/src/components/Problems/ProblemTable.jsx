import ProblemRow from "./ProblemRow";

function ProblemTable({ problems }) {
    return (
        <section className="problem-section">
            <h2>
                Solved Problems ({problems.length})
            </h2>

            {problems.length === 0 ? (
                <p>No solved problems found.</p>
            ) : (
                <table className="problem-table">
                    <thead>
                        <tr>
                            <th>Platform</th>
                            <th>Problem</th>
                            <th>Rating</th>
                            <th>Tags</th>
                            <th>Language</th>
                            <th>Solved On</th>
                        </tr>
                    </thead>

                    <tbody>
                        {problems.map((problem) => (
                            <ProblemRow
                                key={problem._id}
                                problem={problem}
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}

export default ProblemTable;