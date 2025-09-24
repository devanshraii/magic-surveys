import { getDataFromToken } from '@/helpers/getDataFromToken';
import dbConnect from '@/config/dbConnect';
import ResponseModel from '@/models/Response';
import SurveyModel from '@/models/Survey';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ surveyId: string }> }
) {
  const { surveyId } = await context.params;

  await dbConnect();
  try {
    const userId = getDataFromToken(request);

    const survey = await SurveyModel.findById(surveyId);

    if (!survey) {
      return NextResponse.json(
        { success: false, message: 'Survey not found' },
        { status: 404 }
      );
    }

    if (survey.owner.toString() !== userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized action' },
        { status: 403 }
      );
    }

    await ResponseModel.deleteMany({ surveyId });
    await SurveyModel.findByIdAndDelete(surveyId);

    return NextResponse.json(
      { success: true, message: 'Survey and all its responses deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
