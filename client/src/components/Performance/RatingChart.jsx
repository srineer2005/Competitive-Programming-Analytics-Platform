import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Area,
    AreaChart,
} from "recharts";

function RatingChart({ contests }) {
    const chartData = [...(contests || [])]
        .sort(
            (a, b) =>
                new Date(a.contestTime) -
                new Date(b.contestTime)
        )
        .map((contest) => ({
            date: new Date(
                contest.contestTime
            ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            }),
            rating: contest.newRating,
        }));

    return (
        <div
            style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "24px",
                border: "1px solid #e5e7eb",
                boxShadow:
                    "0 5px 20px rgba(37, 99, 235, 0.07)",
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
                    Codeforces Rating
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
                                id="cfGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#6366f1"
                                    stopOpacity={0.45}
                                />

                                <stop
                                    offset="55%"
                                    stopColor="#3b82f6"
                                    stopOpacity={0.18}
                                />

                                <stop
                                    offset="100%"
                                    stopColor="#60a5fa"
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
                                value,
                                "Rating",
                            ]}
                        />

                        <Area
                            type="monotone"
                            dataKey="rating"
                            stroke="#6366f1"
                            strokeWidth={3}
                            fill="url(#cfGradient)"
                            dot={{
                                r: 3,
                                fill: "#6366f1",
                                stroke: "#ffffff",
                                strokeWidth: 2,
                            }}
                            activeDot={{
                                r: 6,
                                fill: "#4f46e5",
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

export default RatingChart;