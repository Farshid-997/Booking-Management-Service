import bcrypt from 'bcrypt';
import { Secret } from 'jsonwebtoken';
import config from '../../config';

import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from '../../interfaces/login';

import { jwtHelpers } from '../../helpers/jwtHelpers';

import { User } from '@prisma/client';
import ApiError from '../../errors/ApiError';
import prisma from '../../shared/prisma';

// creating user
const createUserService = async (user: User): Promise<User | null> => {
  const hashedPassword = await bcrypt.hash(
    user?.password,
    Number(config.bycrypt_salt_rounds)
  );
  user.password = hashedPassword;

  const result = await prisma.user.create({
    data: user,
  });
  if (!result) {
    throw new ApiError(400, 'failed to create User');
  }
  return result;
};

// getByemail
const getByEmailFromDB = async (email: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return result;
};

// checkPassword
const checkPassword = async (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// login
const loginUserService = async (
  payload: ILoginUser
): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await getByEmailFromDB(payload?.email);

  if (!isUserExist) {
    throw new ApiError(404, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await checkPassword(password, isUserExist.password))
  ) {
    throw new ApiError(401, 'Password is incorrect');
  }

  //create access token & refresh token

  const { id: userId, role } = isUserExist;
  const token = jwtHelpers.createToken(
    { userId, role, email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role, email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    token,
    refreshToken,
  };
};

// getrefresh
const getRefreshTokenService = async (
  token: string
): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(403, 'Invalid Refresh Token');
  }

  const { email } = verifiedToken;

  // checking deleted user's refresh token

  const isUserExist = await getByEmailFromDB(email);
  if (!isUserExist) {
    throw new ApiError(404, 'User does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      userId: isUserExist.id,
      role: isUserExist.role,
      email: isUserExist.email,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const authService = {
  createUserService,
  loginUserService,
  getByEmailFromDB,
  getRefreshTokenService,
};
