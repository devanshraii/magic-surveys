import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Question {
  questionText: string;
  options: string[];
}

export interface ISurvey extends Document {
  title: string;
  owner: Types.ObjectId;
  questions: Question[];
  uniqueLink: string;
  createdAt: Date;
}

const QuestionSchema = new Schema<Question>({
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
});

const SurveySchema = new Schema<ISurvey>({
  title: { type: String, required: [true, 'Survey title is required'], trim: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [QuestionSchema],
  uniqueLink: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const SurveyModel =
  (mongoose.models.Survey as mongoose.Model<ISurvey>) ||
  mongoose.model<ISurvey>('Survey', SurveySchema);

export default SurveyModel;
