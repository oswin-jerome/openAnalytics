"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Label, LabelList, Pie, PieChart, RadialBar, RadialBarChart, Tooltip, XAxis, YAxis } from "recharts";

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

export function DeviceCount({ userAgentCounts }: { userAgentCounts: EventCount[] | undefined }) {
  const chartData = userAgentCounts?.map((item, i) => {
    return {
      browser: item.key ?? "Other",
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
        item.key ?? "Other",
        {
          label: item.key ?? "Other",
        },
      ]) || [],
    ),
  } satisfies ChartConfig;
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Device Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="browser" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="visitors" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
