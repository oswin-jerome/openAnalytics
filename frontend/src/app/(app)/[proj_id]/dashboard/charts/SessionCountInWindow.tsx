"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { SessionWithCount } from "@/lib/type";

export function SessionCountInWindow({ sessionWithCount }: { sessionWithCount: SessionWithCount[] }) {
  const chartData2 = [
    { date: "January", count: 186 },
    { date: "February", count: 305 },
    { date: "March", count: 237 },
    { date: "April", count: 73 },
    { date: "May", count: 209 },
    { date: "June", count: 214 },
  ];

  const chartData = sessionWithCount?.map((item) => {
    return {
      date: item.windowStart,
      count: item.sessionCount,
    };
  });

  const chartConfig = {
    count: {
      label: "Count",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;
  return (
    <Card className="xl:col-span-2 max-h-[350px]">
      <CardHeader>
        <CardTitle>Active Sessions</CardTitle>
        <CardDescription>Showing active sessions for the last 1 hour</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <ChartContainer className="h-[80%] w-full px-0" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            // className="p-4"
            margin={{
              //   left: 12,
              //   right: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickLine={false} hide axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-count)" stopOpacity={1} />
                <stop offset="95%" stopColor="var(--color-count)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area dataKey="count" type="basis" fill="url(#fillDesktop)" fillOpacity={0.4} stroke="var(--color-count)" stackId="a" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">January - June 2024</div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
}
