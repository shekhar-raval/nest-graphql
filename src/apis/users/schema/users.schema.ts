import { HttpException, HttpStatus } from '@nestjs/common';
import { Schema, HookNextFunction } from "mongoose";
import * as bcrypt from 'bcryptjs';

export const UserSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    maxlength: 255,
    minlength: 5,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
},
  {
    timestamps: true,
    versionKey: false
  }
);

UserSchema.pre('save', async function (next: HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'name', 'email', 'active'];
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  },
  async matchPassword(password) {
    return bcrypt.compare(password, this.password);
  },
});

UserSchema.statics = {

  async get(id) {
    const user = await this.findById(id).exec();
    if (!user) throw new HttpException('No Record found for given details', HttpStatus.NOT_FOUND);
    return user.transform();
  },

  async validateAndGenerateToken(options) {
    const { email, password } = options;
    const user = await this.findOne({ email }).exec();
    if (!user) {
      throw new HttpException('No Record found for given details', HttpStatus.NOT_FOUND);
    }
    if (!await user.matchPassword(password)) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return user.transform();
  },

  transform(data) {
    return data.transform();
  },

  checkDuplication(error: any) {
    if (error.code === 11000 && (error.name === 'BulkWriteError' || error.name === 'MongoError')) {
      const keys = Object.keys(error.keyPattern);
      if (keys.includes('email')) {
        return new HttpException('Email address already in user', HttpStatus.CONFLICT);
      }
    }
    return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
  },
}
