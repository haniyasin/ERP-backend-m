import * as bcrypt from 'bcrypt';

export function hashPass(password: string) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
}
