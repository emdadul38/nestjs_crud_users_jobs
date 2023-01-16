import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ACCOUNT_STATUS, ACCOUNT_TYPE } from 'src/constants';
import { Address, AddressSchema } from '../common';
import { Document, Model, Query } from 'mongoose';

import { hash, compare } from 'bcrypt';

@Schema({
  timestamps: true,
  methods: {
    isValidPassword: async function (this: UserDocument, candidatePassword: string) {
      
      const hasedPassword = this.password;
      const isMatched = await compare(candidatePassword, hasedPassword);
      return isMatched;
    },
  },
  statics: {
    async findByEmailAndPassword(email: string, password: string) {
      const user = await this.findOne<UserDocument>({ email }, '+password');
      if (!user)  return;

      const isPwdMatched = await user.isValidPassword(password);
      if (!isPwdMatched) return;

      return user;
    },
  },
  query: {
    byName(this: UserModelQuery, name: string) {
      return this.where({ name: new RegExp(name, 'i') });
    }
  },
  discriminatorKey: 'userKind',
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop()
  refreshToken?: string;

  @Prop()
  refreshtokenexpires?: string;

  @Prop()
  age?: number;

  @Prop()
  phone?: string;

  @Prop({
    type: String,
    enum: Object.keys(ACCOUNT_STATUS),
    default: ACCOUNT_STATUS.ACTIVE,
  })
  status?: ACCOUNT_STATUS;

  @Prop({
    type: String,
    enum: Object.keys(ACCOUNT_TYPE),
    immutable: true,
    required: true,
  })
  accountType: ACCOUNT_TYPE;

  @Prop({ type: [String], default: [] })
  social?: string[];

  @Prop({ default: false })
  isEmailVarified?: boolean;

  @Prop({ type: AddressSchema, required: true })
  address: Address;

  @Prop(
    raw({
      reference: { type: String },
      beta: { type: Boolean },
    }),
  )
  metafields: Record<string, any> | any;

  isValidPassword: (candidatePassword: string) => Promise<boolean>;
}

export type UserDocument = User & Document;

export type UserModelQuery = Query<any, UserDocument, IUserQueryHelpers> & IUserQueryHelpers;

export interface IUserQueryHelpers {
  byName(this: UserModelQuery, name: string): UserModelQuery;
}

export interface IUserModel extends Model<UserDocument, IUserQueryHelpers> {
  findByEmailAndPassword: (email: string, password: string) => Promise<UserDocument | undefined>;
}

export const UserSchema = SchemaFactory.createForClass(User);

// alternative way to to add discriminator
// UserSchema.set('discriminatorKey', 'userKind');

UserSchema.pre('save', async function(next: Function) {
  const hashedPassword = await hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

export const USER_MODEL = User.name; // user


// For discriminator rules
// 1. Set discriminator Key on Parent Schema ( User Schema )
// 2. Register Discriminator on Parent Model ( User Model )