import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

function LeetCodeRatingChart({ contests }) {
    const chartData = [...(contests || [])]
        .sort(
            (a, b) =>
                new Date(a.contestStartTime) -
                new Date(b.contestStartTime)
        )
        .map((contest) => ({
            date: new Date(
                contest.contestStartTime
            ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            }),
            rating: contest.rating,
        }));

    return (
        <div
            style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "24px",
                border: "1px solid #e5e7eb",
                boxShadow:
                    "0 5px 20px rgba(249, 115, 22, 0.08)",
            }}
        >
            <div style={{ marginBottom: "20px" }}>
                <h3
                    style={{
                        margin: 0,
                        fontSize: "18px",
                        color: "#1f2937",
                    }}
                >
                    LeetCode Rating
                </h3>

                <p
                    style={{
                        margin: "5px 0 0",
                        fontSize: "13px",
                        color: "#6b7280",
                    }}
                >
                    Rating progression across your contests
                </p>
            </div>

            <div style={{ width: "100%", height: "330px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <defs>
                            <linearGradient
                                id="lcGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#f97316"
                                    stopOpacity={0.45}
                                />

                                <stop
                                    offset="55%"
                                    stopColor="#f59e0b"
                                    stopOpacity={0.18}
                                />

                                <stop
                                    offset="100%"
                                    stopColor="#fb7185"
                                    stopOpacity={0.02}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            stroke="#e5e7eb"
                            strokeDasharray="4 5"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="date"
                            tick={{
                                fill: "#6b7280",
                                fontSize: 11,
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            tick={{
                                fill: "#6b7280",
                                fontSize: 11,
                            }}
                            axisLine={false}
                            tickLine={false}
                            width={45}
                        />

                        <Tooltip
                            contentStyle={{
                                background: "#ffffff",
                                border: "1px solid #e5e7eb",
                                borderRadius: "10px",
                                boxShadow:
                                    "0 8px 25px rgba(0,0,0,0.1)",
                            }}
                            labelStyle={{
                                color: "#374151",
                                fontWeight: "600",
                            }}
                            formatter={(value) => [
                                Math.round(value),
                                "Rating",
                            ]}
                        />

                        <Area
                            type="monotone"
                            dataKey="rating"
                            stroke="#f97316"
                            strokeWidth={3}
                            fill="url(#lcGradient)"
                            dot={{
                                r: 3,
                                fill: "#f97316",
                                stroke: "#ffffff",
                                strokeWidth: 2,
                            }}
                            activeDot={{
                                r: 6,
                                fill: "#ea580c",
                                stroke: "#ffffff",
                                strokeWidth: 3,
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default LeetCodeRatingChart;