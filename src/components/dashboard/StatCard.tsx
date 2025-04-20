
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  progress?: number;
  trend?: {
    value: string;
    positive: boolean;
  };
}

const StatCard = ({ title, value, description, icon: Icon, progress, trend }: StatCardProps) => {
  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardHeader className="pb-2">
        <CardDescription className="flex items-center text-sm">
          {Icon && <Icon className="mr-1.5 h-4 w-4 text-gray-500" />}
          {title}
        </CardDescription>
        <CardTitle className="text-2xl font-bold">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        {progress !== undefined && (
          <>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {progress}% de complétion
            </p>
          </>
        )}
        {trend && (
          <div className="text-xs">
            <span className={trend.positive ? "text-green-500" : "text-red-500"}>
              {trend.value}
            </span>
            {description && (
              <span className="text-muted-foreground ml-1">{description}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default StatCard;
