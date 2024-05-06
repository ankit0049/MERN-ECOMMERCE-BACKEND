import { User } from "../model/User.model.js";
import crypto from 'crypto'
import { sanitizeUser } from "../utils/common.utils.js"; 

export const createUser = async (req, res) => {
  try { 
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      'sha256',
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword, salt });
        const doc = await user.save();
        req.login(sanitizeUser(doc), (err) => {
          // this also calls serializer and adds to session
          if (err) {
            res.status(400).json(err);
          } else {
            const token = jwt.sign(sanitizeUser(doc),process.env.JWT_SECRET_KEY);
            res
              .cookie('jwt', token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
              })
              .status(201)
              .json(token);
          }
        });
      })
  } catch (error) {
    console.error("Error creating User:", error);
    res.status(400).json({ error: error });
  }
};

export const logInUser = async (req, res) => {
  res
    .cookie('jwt', req.user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(201)
    .json(req.user.token);
};

export const checkUser = async (req, res) => {
  res.json({ status: 'success', user: req.user });
};