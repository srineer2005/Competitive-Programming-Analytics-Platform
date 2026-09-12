function ProfileStatistics({ statistics }) {
    const codeforcesSolved =
        statistics?.codeforces?.problemsSolved || 0;

    const leetcodeSolved =
        statistics?.leetcode?.problemsSolved || 0;

    const codechefSolved =
        statistics?.codechef?.problemsSolved || 0;

    return (
        <section className="profile-section">
            <h2>Problems Solved</h2>

            <div className="profile-stats-grid">

                <div className="profile-stat-card">
                    <h3>Codeforces</h3>

                    <p>{codeforcesSolved}</p>

                    <span>Problems Solved</span>
                </div>


                <div className="profile-stat-card">
                    <h3>LeetCode</h3>

                    <p>{leetcodeSolved}</p>

                    <span>Problems Solved</span>
                </div>


                <div className="profile-stat-card">
                    <h3>CodeChef</h3>

                    <p>{codechefSolved}</p>

                    <span>Problems Solved</span>
                </div>


                <div className="profile-stat-card">
                    <h3>Total</h3>

                    <p>
                        {statistics?.totalSolved || 0}
                    </p>

                    <span>Problems Solved</span>
                </div>

            </div>
        </section>
    );
}

export default ProfileStatistics;