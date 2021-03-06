require('dotenv').config();
const sha256 = require('sha256');
const Teacher = require('../../models/teacher.model');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
  const { firstname, email, password, lastname, gender, phone, languages, level, introduction } = req.body;
  console.log('req.body', req.body);
  try {
    console.log('email', email);
    const isExist = await Teacher.findOne({ email });
    console.log('isEx', isExist);
    if (isExist) {
      const err = new Error('This email is taken, please login instead');
      err.status(409);
      return next(err);
    }
    console.log('about to create');
    const teacher = await Teacher.create({ firstname, email, password: sha256(password), lastname, gender, phone, level, introduction });
    console.log('teacher 1-й раз:', teacher);
    teacher.languages.push(languages);
    await teacher.save();
    console.log('teacher 2-й раз:,', teacher);
    // здесь создается токен и отдается юзеру, после надоб будет
    // его сохранить в localStorage
    // const accessToken = jwt.sign({
    //   user: 'teacher',
    //   id: teacher._id,
    //   email: teacher.email,
    // }, process.env.ACCESS_TOKEN_SECRET);
    // console.log('token12345', accessToken);
    // res.status(200).json({ token: accessToken, teacher: 'true' });
    // res.status(200).json({ token: accessToken, teacher });
    res.status(200).json({ teacher });
  } catch(err) {
    console.log('error', err);
    next(err);
  }
}

const logout = (req, res, next) => {
  // не доделал
}

const login = async (req, res, next) => {
  console.log('Зашел в логин на контроллере');
  const { email, password } = req.body;
  console.log(email, password);
  try {
    console.log('Зашел в try');
    const teacher = await Teacher.findOne({ email });
    console.log(teacher);
    console.log(sha256(password));
    console.log(teacher.password);
    if (!teacher) {
      const err = new Error('No teacher found');
      err.status(401);
      throw err;
    }
    if (sha256(password) === teacher.password) {
      console.log('Зашел в нужный if');
      // здесь тоже самое только при логинеx
      // const accessToken = jwt.sign({
      //   id: teacher._id,
      //   name: teacher.name
      // }, process.env.ACCESS_TOKEN_SECRET)
      // res.status(200).json({token: accessToken, teacher});
      res.status(200).json({ teacher });
    };
  } catch(err) { 
    next(err);
  }
}

module.exports = { signup, logout, login }
