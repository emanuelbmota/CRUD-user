import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      telephone: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(401).json({ error: 'User already exists' });
    }

    const { id, name, email, telephone } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      telephone,
    });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const users = await User.findAll({
      order: [['name', 'DESC']],
      limit: 8,
      offset: (page - 1) * 8,
      attributes: ['id', 'name', 'email', 'telephone'],
    });

    return res.json(users);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      telephone: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User doesn't exists" });
    }

    const userEmail = await User.findOne({
      where: { email: req.body.email },
    });

    if (userEmail) {
      return res.status(401).json({ error: 'Email already exists' });
    }

    const { id, email, name, telephone } = await user.update(req.body);

    return res.status(200).json({
      id,
      name,
      email,
      telephone,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json('User not exists');
    }

    await user.destroy();

    return res.status(200).send();
  }
}

export default new UserController();
