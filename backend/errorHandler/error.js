export default function error(err, req, res, next) {
  console.log('error middlewre:', err);
  if (err.message.includes('E11000')) {
    res.status(400).json({ error: 'User already exists' });
  }

  res.status(400).json({ error: err.message });
}
