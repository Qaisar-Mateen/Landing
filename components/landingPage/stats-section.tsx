'use client';

import { Award, Users, FileCheck, Globe } from 'lucide-react';
import CountUp from '@/components/ui/count-up';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  from: number;
  suffix?: string;
  label: string;
  delay?: number;
}

function StatItem({ icon, value, from, suffix = '', label, delay = 0 }: StatItemProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-3">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center shadow-m justify-center">
        {icon}
      </div>
      <div className="space-y-1">
        <div className="text-3xl sm:text-4xl font-bold text-foreground">
          <CountUp to={value} from={from} duration={1.8} delay={delay} separator="," />
          {suffix}
        </div>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export default function StatsSection() {
  const stats = [
    {
      icon: <Award className="w-7 h-7 text-primary" />,
      value: 99,
      from: 69,
      suffix: '%',
      label: 'Approval Rate',
    },
    {
      icon: <FileCheck className="w-7 h-7 text-primary" />,
      value: 50000,
      from: 30000,
      suffix: '+',
      label: 'Visas Processed',
    },
    {
      icon: <Users className="w-7 h-7 text-primary" />,
      value: 35000,
      from: 20000,
      suffix: '+',
      label: 'Happy Customers',
    },
    {
      icon: <Globe className="w-7 h-7 text-primary" />,
      value: 120,
      from: 80,
      suffix: '+',
      label: 'Countries Covered',
    },
  ];

  return (
    <section className="relative z-5 py-20 md:py-28 ">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            Trusted by thousands worldwide
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our numbers speak for themselves. Join the community of satisfied travelers who made their visa journey seamless.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 p-5 px-40 bg-zinc-200/30 dark:bg-zinc-800/30 rounded-full shadow-s">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              icon={stat.icon}
              from={stat.from}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
