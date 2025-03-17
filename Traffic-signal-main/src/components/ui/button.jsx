import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"

const Button = ({ className, asChild = false, ...props }) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90",
        className
      )}
      {...props}
    />
  )
}

export { Button }