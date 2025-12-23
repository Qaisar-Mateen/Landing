import ScrollStack, { ScrollStackItem } from "@/components/ui/scroll-stack";
import { Button } from "@/components/ui/button";

export default function Features() {
  return (
    <ScrollStack  blurAmount={2} className="w-full px-30px">
      <ScrollStackItem>
        <h3 className="text-xl font-semibold">Dedicated network of experts</h3>
        <p className="mt-2 text-sm text-muted-foreground">Tap into specialised teams that help you move faster without sacrificing quality.</p>
      </ScrollStackItem>
      <ScrollStackItem>
        <h3 className="text-xl font-semibold">Fast turnaround</h3>
        <p className="mt-2 text-sm text-muted-foreground">Optimised workflows and responsive support to keep your projects on track.</p>
      </ScrollStackItem>
      <ScrollStackItem>
        <h3 className="text-xl font-semibold">Compliance & partnerships</h3>
        <p className="mt-2 text-sm text-muted-foreground">Built with strong partner relationships and compliance in mind so you can scale globally.</p>
      </ScrollStackItem>
    </ScrollStack>
  );
}