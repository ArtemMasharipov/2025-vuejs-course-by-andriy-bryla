import { validationResult } from 'express-validator';
import { prepareToken } from '../../../services/jwtHelpers.mjs';
import RolesDBService from '../models/role/RolesDBService.mjs';
import UsersDBService from '../models/user/UsersDBService.mjs';

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and Password are required' });
    }

    try {
      const user = await UsersDBService.findByEmail(email);
      if (!user || !(await user.isValidPassword(password))) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = prepareToken({
        id: user._id,
        roleId: user.role._id,
        permissions: user.role.permissions,
      });

      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          ...user.toObject(),
          permissions: user.role.permissions,
        },
      });    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
      const userExists = await UsersDBService.findByEmail(email);
      if (userExists) {
        return res.status(409).json({ error: 'User already exists' });
      }

      const assignedRole = await RolesDBService.findOne({ name: 'user' });
      if (!assignedRole) {
        return res.status(400).json({ error: 'Default role not found' });
      }

      const newUser = await UsersDBService.createUser({
        username,
        email,
        password,
        roleName: assignedRole.name,
      });

      const token = prepareToken({
        id: newUser._id,
        roleId: assignedRole._id,
        permissions: assignedRole.permissions,
      });

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          ...newUser.toObject(),
          permissions: assignedRole.permissions,
        },
        token,
      });    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default AuthController;
