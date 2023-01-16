import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../user';

@Schema()
export class Employer extends User {
  @Prop({ required: true }) 
  company: string;

  @Prop()
  size?: string;

  @Prop({ default: [] })
  workArea?: string[];

  @Prop()
  website?: string; // url
}

export type EmployerDocument = Employer & Document;     // Employer's Properties and Document's Properties like findById, save, etc.

export const EmployerSchema = SchemaFactory.createForClass(Employer)

export const EMPLOYER_MODEL = Employer.name; // Employer
