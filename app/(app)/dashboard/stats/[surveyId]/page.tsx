'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuestionStat {
  questionText: string;
  options: string[];
  responseCounts: number[];
  totalResponses: number;
}

interface SurveyStats {
  surveyTitle: string;
  totalResponses: number;
  stats: QuestionStat[];
}

export default function StatsPage() {
  const params = useParams();
  const { surveyId } = params;
  const router = useRouter();
  const [stats, setStats] = useState<SurveyStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (surveyId) {
      const fetchStats = async () => {
        try {
          const response = await fetch(`/api/surveys/stats/${surveyId}`);
          if (!response.ok) throw new Error('Failed to load stats');
          const data = await response.json();
          setStats(data);
        } catch (error) {
          toast.error('Could not load survey statistics.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchStats();
    }
  }, [surveyId]);

  if (isLoading) return <div className="text-center py-10">Loading statistics...</div>;
  if (!stats) return <div className="text-center py-10">Could not find statistics for this survey.</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={() => router.push('/dashboard')} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <Card className="mb-8">
        <CardHeader>
            <CardTitle className="text-3xl">{stats.surveyTitle}</CardTitle>
            <p className="text-slate-500 text-xl">{stats.totalResponses} Total Responses</p>
        </CardHeader>
      </Card>

      <div className="space-y-8">
        {stats.stats.map((q, qIndex) => (
            <Card key={qIndex}>
                <CardHeader>
                    <CardTitle>{q.questionText}</CardTitle>
                    <p className="text-sm text-slate-500">{q.totalResponses} responses for this question</p>
                </CardHeader>
                <CardContent className="space-y-4">
                    {q.options.map((option, oIndex) => {
                        const percentage = q.totalResponses > 0 ? (q.responseCounts[oIndex] / q.totalResponses) * 100 : 0;
                        return (
                            <div key={oIndex}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-slate-700">{option}</span>
                                    <span className="text-sm font-medium text-slate-500">{q.responseCounts[oIndex]} ({percentage.toFixed(1)}%)</span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2.5">
                                    <div 
                                        className="bg-indigo-600 h-2.5 rounded-full"
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        )
                    })}
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}