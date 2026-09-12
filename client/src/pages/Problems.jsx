import { useEffect, useState } from "react";

import Layout from "../components/Layout/Layout";
import ProblemSummaryCards from "../components/Problems/ProblemSummaryCards";
import ProblemTable from "../components/Problems/ProblemTable";

import "../styles/Problems.css";

import { getSolvedProblems } from "../services/problem.service";

function Problems() {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const data = await getSolvedProblems();

                setProblems(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, []);

    if (loading) {
        return (
            <Layout>
                <h2>Loading solved problems...</h2>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="problems-page">
                <h1>Solved Problems</h1>

                <ProblemSummaryCards problems={problems} />

                <ProblemTable problems={problems} />
            </div>
        </Layout>
    );
}

export default Problems;