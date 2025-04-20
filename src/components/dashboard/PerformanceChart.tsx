
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface PerformanceChartProps {
  data: Array<{
    name: string;
    completed: number;
    inProgress: number;
  }>;
  title: string;
  description: string;
}

const PerformanceChart = ({ data, title, description }: PerformanceChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#9b87f5" name="Complétées" />
                <Bar dataKey="inProgress" fill="#e5deff" name="En cours" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-center text-gray-500">
              <BarChart2 size={64} className="mx-auto mb-4 opacity-50" />
              <p>Aucune donnée disponible</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default PerformanceChart;
