import { cn } from "@/src/lib/utils";
import { ComponentPropsWithoutRef } from "react";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean; // still supported
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group overflow-hidden [--duration:40s] [--gap:1rem]",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 whitespace-nowrap",
          vertical ? "flex-col animate-marquee-vertical" : "flex-row animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {Array(repeat)
          .fill(0)
          .map((_, i) =>
            React.Children.map(children, (child, idx) => (
              <span
                key={`${i}-${idx}`}
                className={vertical ? "block my-2" : "inline-block mx-8"}
              >
                {child}
              </span>
            ))
          )}
      </div>
    </div>
  );
}
