"use client";

import { TrendingUp } from "lucide-react";
import { Label, LabelList, Pie, PieChart, RadialBar, RadialBarChart, Tooltip } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { EventCount } from "@/lib/type";
import { getColor } from "@/lib/utils";
const chartData = [
  { browser: "chrome", visitors: 100, fill: "var(--color-app-400)" },
  { browser: "safari", visitors: 100, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 100, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 100, fill: "var(--color-edge)" },
  { browser: "other", visitors: 50, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  Chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function UserAgentCounts({ userAgentCounts }: { userAgentCounts: EventCount[] | undefined }) {
  const chartData = userAgentCounts?.map((item, i) => {
    return {
      browser: item.key,
      visitors: item.value,
      fill: getColor(i),
    };
  });

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    Chrome: {
      label: "Chrome",
    },
    ...Object.fromEntries(
      userAgentCounts?.map((item, i) => [
        item.key,
        {
          label: item.key,
        },
      ]) || [],
    ),
  } satisfies ChartConfig;
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>User Agents</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            {/* <ChartLegend content={<ChartLegendContent nameKey="browser" />} className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center" /> */}

            <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {userAgentCounts?.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
