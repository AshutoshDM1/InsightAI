import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type QuickActionAccent =
  | "amber"
  | "sky"
  | "emerald"
  | "violet"
  | "rose"
  | "fuchsia";

/** Left stripe + icon tint only; shell stays neutral. */
const accentHint: Record<QuickActionAccent, string> = {
  amber: "border-l-amber-400/90 [&_svg]:text-amber-400",
  sky: "border-l-sky-400/90 [&_svg]:text-sky-400",
  emerald: "border-l-emerald-400/90 [&_svg]:text-emerald-400",
  violet: "border-l-violet-400/90 [&_svg]:text-violet-400",
  rose: "border-l-rose-400/90 [&_svg]:text-rose-400",
  fuchsia: "border-l-fuchsia-400/90 [&_svg]:text-fuchsia-400",
};

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  accent?: QuickActionAccent;
  onClick?: () => void;
  className?: string;
}

function QuickAction({
  icon,
  label,
  accent = "violet",
  onClick,
  className,
}: QuickActionProps) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className={cn(
        "h-auto min-h-9 max-w-full justify-start gap-2 rounded-full border border-white/40 bg-black/35 px-3 py-2 text-left text-neutral-100 backdrop-blur-sm",
        "border-l-2 transition-colors hover:border-white/20 hover:bg-black/50 hover:text-white",
        "focus-visible:ring-1 focus-visible:ring-white/25 focus-visible:ring-offset-0",
        "active:scale-[0.99]",
        "max-w-[min(100%,17.5rem)]",
        accentHint[accent],
        className
      )}
    >
      <span className="flex shrink-0 items-center justify-center [&_svg]:size-4">
        {icon}
      </span>
      <span className="text-xs font-medium leading-snug">{label}</span>
    </Button>
  );
}

export default QuickAction;
