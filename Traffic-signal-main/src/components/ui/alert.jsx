import { cn } from "../../lib/utils"

const Alert = ({ className, variant = "default", ...props }) => {
  return (
    <div
      role="alert"
      className={cn(
        "relative rounded-lg border p-4",
        {
          "bg-destructive text-destructive-foreground": variant === "destructive",
          "bg-background text-foreground": variant === "default",
        },
        className
      )}
      {...props}
    />
  )
}

const AlertDescription = ({ className, ...props }) => {
  return <div className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
}

export { Alert, AlertDescription }