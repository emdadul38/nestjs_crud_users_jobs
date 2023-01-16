import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../user';

@Schema()
export class Student extends User {
  @Prop({ required: true })
  university: string;

  @Prop({ required: true })
  course: string;

  @Prop()
  greade?: string;

  @Prop({ default: false })
  isUnderInternship?: boolean;
}

export type StudentDocument = Student & Document;

export const StudentSchema = SchemaFactory.createForClass(Student);

export const STUDENT_MODEL = Student.name;
