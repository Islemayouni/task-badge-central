
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, Calendar } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PerformanceChartProps {
  data: Array<{
    name: string;
    completed: number;
    inProgress: number;
  }>;
  title: string;
  description: string;
  periods?: {
    value: string;
    label: string;
    data: Array<{
      name: string;
      completed: number;
      inProgress: number;
    }>;
  }[];
}

const PerformanceChart = ({ 
  data: initialData, 
  title, 
  description, 
  periods 
}: PerformanceChartProps) => {
  const [data, setData] = useState(initialData);
  const [period, setPeriod] = useState("week");

  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    if (periods) {
      const newPeriod = periods.find(p => p.value === value);
      if (newPeriod) {
        setData(newPeriod.data);
      }
    }
  };

  return (
    <Card className="hover:border-primary/20 transition-all">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-primary" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {periods && (
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-gray-500" />
            <Select value={period} onValueChange={handlePeriodChange}>
              <SelectTrigger className="w-[140px] h-8">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                {periods.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(26, 31, 44, 0.8)', 
                    borderColor: '#9b87f5',
                    borderRadius: '8px',
                    color: 'white'
                  }} 
                />
                <Legend />
                <Bar dataKey="completed" fill="#9b87f5" name="Complétées" radius={[4, 4, 0, 0]} />
                <Bar dataKey="inProgress" fill="#e5deff" name="En cours" radius={[4, 4, 0, 0]} />
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
