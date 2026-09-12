const axios = require("axios");

const CACHE_DURATION = 5 * 60 * 1000;

let contestsCache = null;
let cacheTimestamp = 0;
let fetchingPromise = null;

const getCodeforcesContests = async () => {
    try {
        const response = await axios.get(
            "https://codeforces.com/api/contest.list"
        );

        const contests = response.data.result;

        const upcoming = contests
            .filter((contest) => contest.phase === "BEFORE")
            .map((contest) => ({
                id: contest.id,
                platform: "Codeforces",
                name: contest.name,
                startTime: new Date(
                    contest.startTimeSeconds * 1000
                ),
                duration: contest.durationSeconds,
                url: `https://codeforces.com/contests/${contest.id}`,
            }))
            .sort(
                (a, b) =>
                    new Date(a.startTime) -
                    new Date(b.startTime)
            );

        const recent = contests
            .filter((contest) => contest.phase === "FINISHED")
            .sort(
                (a, b) =>
                    b.startTimeSeconds -
                    a.startTimeSeconds
            )
            .slice(0, 3)
            .map((contest) => ({
                id: contest.id,
                platform: "Codeforces",
                name: contest.name,
                startTime: new Date(
                    contest.startTimeSeconds * 1000
                ),
                duration: contest.durationSeconds,
                url: `https://codeforces.com/contests/${contest.id}`,
            }));

        return {
            upcoming,
            recent,
        };
    } catch (error) {
        console.error(
            "Codeforces API Error:",
            error.response?.data || error.message
        );

        return {
            upcoming: [],
            recent: [],
        };
    }
};

const getLeetCodeContests = async () => {
    let upcoming = [];
    let recent = [];

    // Fetch upcoming contests
    try {
        const response = await axios.post(
            "https://leetcode.com/graphql",
            {
                query: `
                    query {
                        upcomingContests {
                            title
                            titleSlug
                            startTime
                            duration
                        }
                    }
                `,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                },
            }
        );

        const contests =
            response.data?.data?.upcomingContests || [];

        upcoming = contests
            .map((contest) => ({
                id: contest.titleSlug,
                platform: "LeetCode",
                name: contest.title,
                startTime: new Date(
                    Number(contest.startTime) * 1000
                ),
                duration: Number(contest.duration) || 0,
                url: `https://leetcode.com/contest/${contest.titleSlug}`,
            }))
            .sort(
                (a, b) =>
                    new Date(a.startTime) -
                    new Date(b.startTime)
            );
    } catch (error) {
        console.error(
            "LeetCode Upcoming Contest Error:",
            error.response?.data || error.message
        );
    }

    // Fetch recent contests
    try {
        const response = await axios.post(
            "https://leetcode.com/graphql",
            {
                query: `
                    query pastContests(
                        $pageNo: Int,
                        $numPerPage: Int
                    ) {
                        pastContests(
                            pageNo: $pageNo,
                            numPerPage: $numPerPage
                        ) {
                            data {
                                title
                                titleSlug
                                startTime
                                duration
                            }
                        }
                    }
                `,
                variables: {
                    pageNo: 1,
                    numPerPage: 3,
                },
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                },
            }
        );

        const contests =
            response.data?.data?.pastContests?.data || [];

        recent = contests
            .map((contest) => ({
                id: contest.titleSlug,
                platform: "LeetCode",
                name: contest.title,
                startTime: new Date(
                    Number(contest.startTime) * 1000
                ),
                duration: Number(contest.duration) || 0,
                url: `https://leetcode.com/contest/${contest.titleSlug}`,
            }))
            .sort(
                (a, b) =>
                    new Date(b.startTime) -
                    new Date(a.startTime)
            )
            .slice(0, 3);
    } catch (error) {
        console.error(
            "LeetCode Recent Contest Error:",
            error.response?.data || error.message
        );
    }

    return {
        upcoming,
        recent,
    };
};

const fetchContests = async () => {
    const [codeforces, leetcode] = await Promise.all([
        getCodeforcesContests(),
        getLeetCodeContests(),
    ]);

    return {
        upcoming: {
            codeforces: codeforces.upcoming,
            leetcode: leetcode.upcoming,
        },
        recent: {
            codeforces: codeforces.recent,
            leetcode: leetcode.recent,
        },
    };
};

const getContests = async () => {
    const now = Date.now();

    if (
        contestsCache &&
        now - cacheTimestamp < CACHE_DURATION
    ) {
        return contestsCache;
    }

    if (fetchingPromise) {
        return await fetchingPromise;
    }

    fetchingPromise = fetchContests();

    try {
        const contests = await fetchingPromise;

        contestsCache = contests;
        cacheTimestamp = Date.now();

        return contests;
    } finally {
        fetchingPromise = null;
    }
};

module.exports = {
    getContests,
};