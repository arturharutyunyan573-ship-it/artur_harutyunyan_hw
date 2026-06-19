// import moment from 'moment';
import jwt from "jsonwebtoken";
import HttpErrors from "http-errors";

import Users from '../models/users_old.js'

const {
  TOKEN_SECRET,
} = process.env;

export default async (req, res, next) => {
  try {
    const token = String(req.headers?.authorization)
      .replace('Bearer')
      .trim() || null;

    if (!token) {
      next(new HttpErrors(401));
      return;
    }

    let decryptData = null;

    try {
      decryptData = jwt.verify(token, TOKEN_SECRET);
    } catch (err) {
      console.log(err.message)
    }

    // const decryptData = Users.decrypt(token);

    // if (!decryptData || !decryptData?.userId || !decryptData?.expiresIn) {
    if (!decryptData || !decryptData?.userId) {
      next(new HttpErrors(401));
      return;
    }

    // if (moment().isAfter(moment(decryptData.expiresIn))) {
    //   next(new HttpErrors(401, 'Token expired!'));
    //   return;
    // }

    req.userId = decryptData?.userId;

    const user = await Users.findById(req.userId)

    if (!user) {
      next(new HttpErrors(401));
      return;
    }


    next();
  } catch (err) {
    console.log(err);
    next(new HttpErrors(401));
  }
}
