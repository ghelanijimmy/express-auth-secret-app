import mongoose from 'mongoose';
import md5 from 'md5';

const userConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/userDB');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = userConnection.model('User', userSchema);

export const saveUser = async (user: { email: string; password: string }) => {
  const newUser = new User({ email: user.email, password: md5(user.password) });
  return await newUser.save().catch((err) => console.log(err));
};

export const findUser = async (user: { email: string; password: string }) => {
  return await User.findOne({ email: user.email, password: md5(user.password) }).catch((err) => console.log(err));
};
