import dbConnect from '@/config/dbConnect';
import ResponseModel from '@/models/Response';
import SurveyModel from '@/models/Survey';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { surveyId, answers } = await request.json();

    const survey = await SurveyModel.findById(surveyId);
    if (!survey) {
        return NextResponse.json({ success: false, message: 'Survey not found' }, { status: 404 });
    }

    const newResponse = new ResponseModel({
        surveyId,
        answers
    });

    await newResponse.save();

    return NextResponse.json({
        success: true,
        message: 'Response submitted successfully'
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}