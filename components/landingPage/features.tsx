import ScrollStack, { ScrollStackItem } from "@/components/ui/scroll-stack";
import { Button } from "@/components/ui/button";
import { Users, Zap, ShieldCheck, ArrowRight } from "lucide-react";

export default function Features() {
  return (
    <ScrollStack blurAmount={2} className="w-full px-30px">
      {/* Card 1 - Experts */}
      <ScrollStackItem itemClassName="shadow-m bg-zinc-50/80 dark:bg-zinc-900/50 backdrop-blur-sm p-8 rounded-3xl border border-border/50">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Users className="w-7 h-7 text-primary" />
          </div>
          <div className="flex-1 space-y-3">
            <h3 className="text-xl font-semibold text-foreground">Dedicated network of experts</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Tap into specialised teams that help you move faster without sacrificing quality. Our experts have processed over 50,000+ visa applications.</p>
            <div className="flex items-center gap-6 pt-2">
              <div>
                <p className="text-2xl font-bold text-foreground">50K+</p>
                <p className="text-xs text-muted-foreground">Applications</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">120+</p>
                <p className="text-xs text-muted-foreground">Countries</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">24/7</p>
                <p className="text-xs text-muted-foreground">Support</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollStackItem>

      {/* Card 2 - Fast Turnaround */}
      <ScrollStackItem itemClassName="shadow-m bg-zinc-50/80 dark:bg-zinc-900/50 backdrop-blur-sm p-8 rounded-3xl border border-border/50">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center">
            <Zap className="w-7 h-7 text-green-500" />
          </div>
          <div className="flex-1 space-y-3">
            <h3 className="text-xl font-semibold text-foreground">Fast turnaround</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Optimised workflows and responsive support to keep your projects on track. Most applications are processed within 48 hours.</p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-400 rounded-full">Express Processing</span>
              <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">Real-time Updates</span>
              <span className="px-3 py-1 text-xs font-medium bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-full">Priority Queue</span>
            </div>
          </div>
        </div>
      </ScrollStackItem>

      {/* Card 3 - Compliance */}
      <ScrollStackItem itemClassName="shadow-m bg-zinc-50/80 dark:bg-zinc-900/50 backdrop-blur-sm p-8 rounded-3xl border border-border/50">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7 text-purple-500" />
          </div>
          <div className="flex-1 space-y-3">
            <h3 className="text-xl font-semibold text-foreground">Compliance & partnerships</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Built with strong partner relationships and compliance in mind so you can scale globally with confidence.</p>
            <div className="flex items-center gap-4 pt-2">
              <Button variant="outline" size="sm" className="gap-2 text-black dark:text-white">
                Learn more <ArrowRight className="w-4 h-4" />
              </Button>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 border-2 border-background flex items-center justify-center text-xs font-medium text-black dark:text-white">🇺🇸</div>
                <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 border-2 border-background flex items-center justify-center text-xs font-medium text-black dark:text-white">🇬🇧</div>
                <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 border-2 border-background flex items-center justify-center text-xs font-medium text-black dark:text-white">🇦🇪</div>
                <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 border-2 border-background flex items-center justify-center text-xs font-medium text-black dark:text-white">🇨🇦</div>
              </div>
            </div>
          </div>
        </div>
      </ScrollStackItem>
    </ScrollStack>
  );
}