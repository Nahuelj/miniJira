import bcrypt from "bcrypt";

export function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

export function comparePasswords(hashedPassword, plainPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}
