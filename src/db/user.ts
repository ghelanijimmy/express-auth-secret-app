import mongoose from 'mongoose';

export const userConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/userDB');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

export const User = userConnection.model('User', userSchema);
