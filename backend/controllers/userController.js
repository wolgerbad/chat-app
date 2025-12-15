import { userService } from '../service/userService.js';

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const result = await userService().login({ email, password });

    res.cookie('jwt', result.token, {
      httpOnly: true,
    });

    res.json({
      id: result.id,
      name: result.name,
      email: result.email,
      image: result.image,
    });
  } catch (error) {
    next(error);
  }
}

export async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const result = await userService().signup({
      name,
      email,
      password,
    });
    console.log('result', result);
    if (result.error) throw new Error(result.error);

    res.cookie('jwt', result.token, {
      httpOnly: true,
    });

    res.json({ id: result.id, name, email });
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res, next) {
  res.cookie('jwt', 'x', {
    maxAge: 1,
    httpOnly: true,
  });
  res.json({ message: 'logout success' });
}

export async function getUser(req, res, next) {
  try {
    const id = req.params.id;
    const result = await userService().getUser(id);

    if (result.error) throw new Error(result.error);

    res.json({
      id,
      name: result.name,
      email: result.email,
      image: result.image,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateUser(req, res, next) {
  const field = req.body;
  const id = req.params.id;
  const updatedUser = await userService().updateUser(id, field);

  res.json(updatedUser);
}

export async function findUsers(req, res, next) {
  const val = req.params.val;
  const users = await userService().findUsers(val);

  res.json(users);
}
