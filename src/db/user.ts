import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const userConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/userDB');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = userConnection.model('User', userSchema);

export const saveUser = async (user: { email: string; password: string }) => {
  // const salt = bcrypt.genSaltSync(saltRounds);
  bcrypt.hash(user.password, saltRounds, async (err, hash) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      const newUser = new User({ email: user.email, password: hash });
      return await newUser.save().catch((err) => console.log(err));
    }
  });
};

export const findUser = async (user: { email: string; password: string }) => {
  const foundUser = await User.findOne({ email: user.email });
  return new Promise<boolean>((resolve, reject) => {
    if (!foundUser) {
      reject(false);
    } else {
      if (foundUser) {
        bcrypt.compare(user.password, foundUser.password as string, (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      } else {
        resolve(false);
      }
    }
  });
};
