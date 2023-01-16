import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, USER_MODEL } from '../user';
import { JOB_TYPE } from 'src/constants';
import { Address, AddressSchema } from '../common';

@Schema({
  timestamps: true,
})
export class Job {
  @Prop({ type: Types.ObjectId, ref: USER_MODEL, required: true })
  employer: Types.ObjectId | User;

  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  experience: number;

  @Prop({ default: [] })
  tags?: string[];

  @Prop()
  salary?: string;

  @Prop({
    type: String,
    enum: Object.keys(JOB_TYPE),
    required: true,
  })
  type: JOB_TYPE;

  @Prop({ type: AddressSchema, required: true })
  location: Address;
}

export type JobDocument = Job & Document;

export const JobSchema = SchemaFactory.createForClass(Job);

function populateMiddleware (next: Function) {
  this.populate({ path: 'employer', select: { name: 1, _id: 1 } });
  next();
}

JobSchema.pre('findOne', populateMiddleware);

JobSchema.pre('find', populateMiddleware);

export const JOB_MODEL = Job.name; // job
