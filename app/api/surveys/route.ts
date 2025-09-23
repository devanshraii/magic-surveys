import { getDataFromToken } from '@/helpers/getDataFromToken';
import dbConnect from '@/config/dbConnect';
import SurveyModel from '@/models/Survey';
import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import UserModel from '@/models/User';

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const userId = getDataFromToken(request);
    const surveys = await SurveyModel.find({ owner: userId }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      surveys,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
    await dbConnect();
    try {
        const userId = getDataFromToken(request);
        const { title, questions } = await request.json();

        const user = await UserModel.findById(userId);
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        const newSurvey = new SurveyModel({
            title,
            owner: userId,
            questions,
            uniqueLink: nanoid(8)
        });

        await newSurvey.save();

        return NextResponse.json({
            success: true,
            message: "Survey created successfully",
            survey: newSurvey
        }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}