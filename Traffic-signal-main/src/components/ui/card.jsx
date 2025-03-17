import { cn } from "../../lib/utils"

const Card = ({ className, ...props }) => {
  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
  )
}

const CardHeader = ({ className, ...props }) => {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
}

const CardTitle = ({ className, ...props }) => {
  return <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
}

const CardContent = ({ className, ...props }) => {
  return <div className={cn("p-6 pt-0", className)} {...props} />
}

export { Card, CardHeader, CardTitle, CardContent }