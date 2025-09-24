import { getDataFromToken } from '@/helpers/getDataFromToken';
import dbConnect from '@/config/dbConnect';
import ResponseModel from '@/models/Response';
import SurveyModel, { Question } from '@/models/Survey';
import { NextRequest, NextResponse } from 'next/server';

interface QuestionStat extends Question {
  responseCounts: number[];
  totalResponses: number;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ surveyId: string }> } 
) {
  const { surveyId } = await context.params; 

  await dbConnect();
  try {
    const userId = getDataFromToken(request);

    const survey = await SurveyModel.findOne({ _id: surveyId, owner: userId });

    if (!survey) {
      return NextResponse.json(
        { success: false, message: 'Survey not found or you are not the owner' },
        { status: 404 }
      );
    }

    const responses = await ResponseModel.find({ surveyId });
    const totalResponseCount = responses.length;

    const questionStats: QuestionStat[] = survey.questions.map((question, qIndex) => {
      const responseCounts = new Array(question.options.length).fill(0);
      let questionTotalResponses = 0;

      responses.forEach((response) => {
        const answer = response.answers.find((ans) => ans.questionIndex === qIndex);
        if (answer && answer.selectedOption < question.options.length) {
          responseCounts[answer.selectedOption]++;
          questionTotalResponses++;
        }
      });

      return {
        questionText: question.questionText,
        options: question.options,
        responseCounts,
        totalResponses: questionTotalResponses,
      };
    });

    return NextResponse.json({
      success: true,
      surveyTitle: survey.title,
      totalResponses: totalResponseCount,
      stats: questionStats,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
