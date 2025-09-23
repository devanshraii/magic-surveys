import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Answer {
  questionIndex: number;
  selectedOption: number;
}

export interface IResponse extends Document {
  surveyId: Types.ObjectId;
  answers: Answer[];
  submittedAt: Date;
}

const AnswerSchema = new Schema<Answer>({
  questionIndex: { type: Number, required: true },
  selectedOption: { type: Number, required: true },
});

const ResponseSchema = new Schema<IResponse>({
  surveyId: { type: Schema.Types.ObjectId, ref: 'Survey', required: true },
  answers: [AnswerSchema],
  submittedAt: { type: Date, default: Date.now },
});

const ResponseModel =
  (mongoose.models.Response as mongoose.Model<IResponse>) ||
  mongoose.model<IResponse>('Response', ResponseSchema);

export default ResponseModel;
