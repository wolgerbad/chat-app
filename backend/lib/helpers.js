import jwt from 'jsonwebtoken';

export function generateToken(id) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET);
  return token;
}
