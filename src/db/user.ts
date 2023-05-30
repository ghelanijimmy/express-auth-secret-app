import mongoose from 'mongoose';
import encrypt from 'mongoose-encryption';

export const userConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/userDB');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const ENCRYPTION_KEY = process.env.ENCKEY;
const SIGNING_KEY = process.env.SIGKEY;

userSchema.plugin(encrypt, { encryptionKey: ENCRYPTION_KEY, signingKey: SIGNING_KEY, encryptedFields: ['password'] });

export const User = userConnection.model('User', userSchema);
