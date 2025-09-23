'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Copy, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Survey {
  _id: string;
  title: string;
  uniqueLink: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [surveyToDelete, setSurveyToDelete] = useState<Survey | null>(null);
  const router = useRouter();

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || '';

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await fetch('/api/surveys');
        if (!response.ok) {
            throw new Error('Failed to fetch surveys');
        }
        const data = await response.json();
        setSurveys(data.surveys);
      } catch (error) {
        toast.error('Could not load your surveys.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSurveys();
  }, []);
  
  const handleConfirmDelete = async () => {
    if (!surveyToDelete) return;

    try {
        const response = await fetch(`/api/surveys/manage/${surveyToDelete._id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete survey.');
        }

        setSurveys(surveys.filter(s => s._id !== surveyToDelete._id));
        toast.success(`Survey "${surveyToDelete.title}" deleted successfully.`);
    } catch (error) {
        toast.error('An error occurred while deleting the survey.');
    } finally {
        setSurveyToDelete(null);
    }
  };


  const copyToClipboard = (link: string) => {
    const fullLink = `${appUrl}/survey/${link}`;
    navigator.clipboard.writeText(fullLink);
    toast.success('Link copied to clipboard!');
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Surveys</h1>
          <Button onClick={() => router.push('/create-survey')} className="bg-indigo-600 hover:bg-indigo-700">
            Create New Survey
          </Button>
        </div>

        {isLoading ? (
          <p>Loading surveys...</p>
        ) : surveys.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <h2 className="text-xl font-semibold">No surveys yet!</h2>
              <p className="text-slate-500 mt-2">Click "Create New Survey" to get started with AI.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {surveys.map((survey) => (
              <Card key={survey._id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="truncate">{survey.title}</CardTitle>
                  <CardDescription>
                    Created on {new Date(survey.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-between bg-slate-50 p-4 rounded-md">
                  <code className="text-sm text-slate-700 truncate">
                      {`${appUrl.replace(/https?:\/\//, '')}/survey/${survey.uniqueLink}`}
                  </code>
                  <Button variant="ghost" size="icon" onClick={() => copyToClipboard(survey.uniqueLink)}>
                      <Copy className="h-4 w-4" />
                  </Button>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setSurveyToDelete(survey)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                  <Button asChild variant="outline">
                      <Link href={`/dashboard/stats/${survey._id}`}>View Stats</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={!!surveyToDelete} onOpenChange={() => setSurveyToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the survey 
              <span className="font-semibold">"{surveyToDelete?.title}"</span> and all of its responses.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
                onClick={handleConfirmDelete} 
                className="bg-red-600 hover:bg-red-700">
                Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}