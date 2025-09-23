'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Question {
  questionText: string;
  options: string[];
}

interface Survey {
  _id: string;
  title: string;
  questions: Question[];
}

export default function SurveyPage() {
  const params = useParams();
  const { uniqueLink } = params;
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (uniqueLink) {
      const fetchSurvey = async () => {
        try {
          const response = await fetch(`/api/surveys/${uniqueLink}`);
          if (!response.ok) throw new Error('Survey not found.');
          const data = await response.json();
          setSurvey(data.survey);
        } catch (error) {
          toast.error('Could not load the survey.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchSurvey();
    }
  }, [uniqueLink]);

  const handleAnswerChange = (qIndex: number, oIndex: number) => {
    setAnswers({
      ...answers,
      [qIndex]: oIndex
    });
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== survey?.questions.length) {
        toast.error('Please answer all questions before submitting.');
        return;
    }
    setIsSubmitting(true);

    const formattedAnswers = Object.entries(answers).map(([qIndex, oIndex]) => ({
        questionIndex: parseInt(qIndex),
        selectedOption: oIndex,
    }));

    try {
        await fetch('/api/responses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ surveyId: survey?._id, answers: formattedAnswers })
        });
        setIsSubmitted(true);
    } catch (error) {
        toast.error("Failed to submit your response.");
    } finally {
        setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen"><p>Loading Survey...</p></div>;
  if (!survey) return <div className="flex justify-center items-center h-screen"><p>Survey not found.</p></div>;

  if (isSubmitted) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100">
            <Card className="w-full max-w-2xl mx-4 text-center">
                <CardHeader>
                    <CardTitle className="text-3xl">Thank You!</CardTitle>
                    <CardDescription>Your response has been recorded.</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center">{survey.title}</h1>
        <p className="text-center text-slate-500 mt-2 mb-10">Please answer the following questions.</p>
        
        <div className="space-y-8">
            {survey.questions.map((q, qIndex) => (
                <Card key={qIndex}>
                    <CardHeader>
                        <CardTitle>{q.questionText}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup onValueChange={(value) => handleAnswerChange(qIndex, parseInt(value))}>
                            {q.options.map((opt, oIndex) => (
                                <div key={oIndex} className="flex items-center space-x-2 p-3 rounded-md hover:bg-slate-50">
                                    <RadioGroupItem value={oIndex.toString()} id={`q${qIndex}o${oIndex}`} />
                                    <Label htmlFor={`q${qIndex}o${oIndex}`} className="text-base flex-1 cursor-pointer">{opt}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </CardContent>
                </Card>
            ))}
        </div>
        <div className="mt-10 flex justify-end">
            <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-6">
                {isSubmitting ? 'Submitting...' : 'Submit Response'}
            </Button>
        </div>
      </div>
    </div>
  );
}