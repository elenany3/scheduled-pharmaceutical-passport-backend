const {
  hashPassword,
  verifyPassword,
  signToken,
} = require("./strategies/util");
const db = require("../../models");
const { Op } = require("sequelize");
const { roles } = require("../../config");

exports.login = async ({ body }) => {
  const { email, password } = body;
  let founduser = await db.User.findOne({ where: { email } });
  if (!founduser) return { err: "no such user", status: 404 };
  user = founduser.toJSON();
  const valid = await verifyPassword(password, user.password);
  if (!valid) return { err: "wrong password", status: 406 };
  const token = signToken({ id: user.id });
  return {
    message: "user login successfully",
    data: { user, token },
  };
};

exports.createAdmin = async ({ body }) => {
  const { email, password } = body;
  let user = await _save_user({ email, password, address: email, role: roles.admin })
  if (user.error)
    return user;
  else
    return {
      message: "admin created successfully",
      data: user,
    };
};

exports.save_user = async ({ email, password, address, role }) => {
  return await _save_user({ email, password, address, role });
};

_save_user = async ({ email, password, address, role }) => {
  try {
    return new Promise(async (resolve, reject) => {
      const foundUser = await db.User.findOne({ where: { [Op.or]: [{ email }, { address }] } });
      if (foundUser)
        reject({ error: true, message: "User with this email or address already exists", status: 409 });
      else {
        const hash = await hashPassword(password);
        const user = await db.User.create(
          {
            email,
            password: hash,
            address,
            role
          }
        );
        resolve(user)
      }
    });
  } catch (err) {
    reject({ error: true, message: err.message })
  }
};

exports.delete_user = async (data) => {
  return await _delete_user(data);
};

_delete_user = async (data) => {
  try {
    return new Promise(async (resolve, reject) => {
      await db.User.destroy({ where: data });
      resolve({
        message: "User deleted successfully."
      });
    });
  } catch (err) {
    reject({ error: true, message: err.message })
  }
};

exports.get_user = async (data) => {
  return await _get_user(data);
};

_get_user = async (data) => {
  try {
    return new Promise(async (resolve, reject) => {
      let user = await db.User.findOne({ where: data , raw: true});
      resolve (user);
    });
  } catch (err) {
    reject({ error: true, err: err.message })
  }
};