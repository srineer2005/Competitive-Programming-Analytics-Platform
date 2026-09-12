function ProblemRow({ problem }) {
    return (
        <tr>
            <td>{problem.platform}</td>

            <td>{problem.problemName}</td>

            <td>{problem.rating ?? "-"}</td>

            <td>
                {problem.tags?.length
                    ? problem.tags.join(", ")
                    : "-"}
            </td>

            <td>{problem.language || "-"}</td>

            <td>
                {problem.submittedAt
                    ? new Date(problem.submittedAt).toLocaleDateString()
                    : "-"}
            </td>
        </tr>
    );
}

export default ProblemRow;