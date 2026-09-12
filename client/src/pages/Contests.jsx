import { useEffect, useMemo, useState } from "react";

import "../styles/Contests.css";

import Layout from "../components/Layout/Layout";
import ContestList from "../components/Contests/ContestList";
import ContestSummaryCards from "../components/Contests/ContestSummaryCards";

import { getContests } from "../services/contest.service";

function Contests() {
    const [contests, setContests] = useState({
        upcoming: {
            codeforces: [],
            leetcode: [],
        },
        recent: {
            codeforces: [],
            leetcode: [],
        },
    });

    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchContests = async () => {
            try {
                const data = await getContests();

                setContests(data);
            } catch (error) {
                console.error(
                    "Contest Error:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchContests();
    }, []);

    const upcoming = contests.upcoming || {
        codeforces: [],
        leetcode: [],
    };

    const recent = contests.recent || {
        codeforces: [],
        leetcode: [],
    };

    const searchContests = (contestList) => {
        return contestList.filter((contest) =>
            contest.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    };

    const filteredUpcomingCodeforces =
        useMemo(
            () =>
                searchContests(
                    upcoming.codeforces
                ),
            [upcoming.codeforces, search]
        );

    const filteredUpcomingLeetcode =
        useMemo(
            () =>
                searchContests(
                    upcoming.leetcode
                ),
            [upcoming.leetcode, search]
        );

    const filteredRecentCodeforces =
        useMemo(
            () =>
                searchContests(
                    recent.codeforces
                ),
            [recent.codeforces, search]
        );

    const filteredRecentLeetcode =
        useMemo(
            () =>
                searchContests(
                    recent.leetcode
                ),
            [recent.leetcode, search]
        );

    const upcomingCount =
        (filter === "all" || filter === "codeforces"
            ? filteredUpcomingCodeforces.length
            : 0) +
        (filter === "all" || filter === "leetcode"
            ? filteredUpcomingLeetcode.length
            : 0);

    const recentCount =
        (filter === "all" || filter === "codeforces"
            ? filteredRecentCodeforces.length
            : 0) +
        (filter === "all" || filter === "leetcode"
            ? filteredRecentLeetcode.length
            : 0);

    if (loading) {
        return (
            <Layout>
                <div className="contests-loading">
                    <div className="contest-loading-spinner"></div>

                    <h2>
                        Loading contests...
                    </h2>

                    <p>
                        Fetching the latest
                        contest schedule.
                    </p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="contests-page">

                {/* HEADER */}

                <div className="contests-header">
                    <div>
                        <h1>Contests</h1>

                        <p>
                            Stay updated with upcoming
                            and recently completed
                            coding contests.
                        </p>
                    </div>
                </div>

                {/* SUMMARY */}

                <ContestSummaryCards
                    contests={upcoming}
                />

                {/* CONTROLS */}

                <div className="contest-controls">

                    <div className="contest-filters">

                        <button
                            className={
                                filter === "all"
                                    ? "active-filter"
                                    : ""
                            }
                            onClick={() =>
                                setFilter("all")
                            }
                        >
                            All
                        </button>

                        <button
                            className={
                                filter === "codeforces"
                                    ? "active-filter"
                                    : ""
                            }
                            onClick={() =>
                                setFilter(
                                    "codeforces"
                                )
                            }
                        >
                            Codeforces
                        </button>

                        <button
                            className={
                                filter === "leetcode"
                                    ? "active-filter"
                                    : ""
                            }
                            onClick={() =>
                                setFilter(
                                    "leetcode"
                                )
                            }
                        >
                            LeetCode
                        </button>

                    </div>

                    <div className="contest-search">
                        <span>⌕</span>

                        <input
                            type="text"
                            placeholder="Search contests..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />
                    </div>

                </div>

                {/* UPCOMING */}

                <div className="contest-page-section">

                    <div className="section-heading">

                        <div>
                            <h2>
                                Upcoming Contests
                            </h2>

                            <p>
                                Don't miss your next
                                opportunity to compete.
                            </p>
                        </div>

                        <span className="section-count">
                            {upcomingCount}{" "}
                            {upcomingCount === 1
                                ? "contest"
                                : "contests"}
                        </span>

                    </div>

                    <div className="platform-columns">

                        {(filter === "all" ||
                            filter ===
                                "codeforces") && (
                            <ContestList
                                title="Codeforces"
                                contests={
                                    filteredUpcomingCodeforces
                                }
                            />
                        )}

                        {(filter === "all" ||
                            filter ===
                                "leetcode") && (
                            <ContestList
                                title="LeetCode"
                                contests={
                                    filteredUpcomingLeetcode
                                }
                            />
                        )}

                    </div>

                </div>

                {/* RECENT */}

                <div className="contest-page-section recent-section">

                    <div className="section-heading">

                        <div>
                            <h2>
                                Recent Contests
                            </h2>

                            <p>
                                Recently completed
                                contests from both
                                platforms.
                            </p>
                        </div>

                        <span className="section-count recent-count">
                            {recentCount}{" "}
                            {recentCount === 1
                                ? "contest"
                                : "contests"}
                        </span>

                    </div>

                    <div className="platform-columns">

                        {(filter === "all" ||
                            filter ===
                                "codeforces") && (
                            <ContestList
                                title="Codeforces"
                                contests={
                                    filteredRecentCodeforces
                                }
                                recent
                            />
                        )}

                        {(filter === "all" ||
                            filter ===
                                "leetcode") && (
                            <ContestList
                                title="LeetCode"
                                contests={
                                    filteredRecentLeetcode
                                }
                                recent
                            />
                        )}

                    </div>

                </div>

            </div>
        </Layout>
    );
}

export default Contests;