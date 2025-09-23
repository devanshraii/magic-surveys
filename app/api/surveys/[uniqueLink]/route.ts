import dbConnect from '@/config/dbConnect';
import SurveyModel from '@/models/Survey';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { uniqueLink: string } }
) {
  await dbConnect();
  try {
    const survey = await SurveyModel.findOne({ uniqueLink: params.uniqueLink }).select('-owner');

    if (!survey) {
      return NextResponse.json({ success: false, message: 'Survey not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      survey,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}