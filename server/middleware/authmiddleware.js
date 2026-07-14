import jwt from 'jsonwebtoken';

const authMiddleware = (
  req,
  res,
  next
) => {

  const token =
    req.header('Authorization');

  if (!token) {

    return res
      .status(401)
      .json({
        message:
          'No token found'
      });
  }

  try {

    const actualToken =
      token.split(' ')[1];


    const decoded = jwt.verify(
      actualToken,

      process.env.JWT_SECRET
    );


    req.user = decoded;

    next();

  } catch (error) {

    res
      .status(401)
      .json({
        message:
          'Invalid Token'
      });
  }
};

export default authMiddleware;