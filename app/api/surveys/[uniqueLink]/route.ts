import dbConnect from '@/config/dbConnect';
import SurveyModel from '@/models/Survey';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ uniqueLink: string }> } //build time pe error 
) {
  const { uniqueLink } = await context.params; 

  await dbConnect();
  try {
    const survey = await SurveyModel.findOne({ uniqueLink }).select('-owner');

    if (!survey) {
      return NextResponse.json(
        { success: false, message: 'Survey not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      survey,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
