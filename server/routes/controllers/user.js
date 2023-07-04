import { promiseQuery } from "../../DB/DB.js";

export const Signup = async (req, res) => {
  const { uid, name, status, email } = req.body;

  if (!uid || !name || !email) {
    res.status(404).json({ msg: "invalid signature " });
  }

  // user exist or not

  try {
    let sql = `SELECT * from user Where uid='${uid}' AND email="${email}"`;
    let [user] = await promiseQuery(sql);

    if (user) {
      res.status(202).json({ message: "User already Exist! plz Login" });
      return;
    }

    sql = `INSERT INTO user (uid,name,email,status) values ('${uid}','${name}','${email}','${status}')`;
    await promiseQuery(sql);

    res.status(201).json({ message: "User SignUp" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const login = async (req, res) => {
  const { uid, email } = req.body;

  if (!uid || !email) {
    res.status(404).json({ msg: "invalid signature " });
  }
  try {
    let sql = `SELECT * from user Where uid='${uid}' AND email="${email}"`;
    let [user] = await promiseQuery(sql);
    delete user.id;
    if (user) {
      if (user.status === 1) {
        res.status(201).json({ message: "User Login", user: user });
      } else {
        res.status(203).json({ message: "Blocked" });
      }
    } else {
      res.status(401).json({ message: "User Not Found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
