import jwt from 'jsonwebtoken'; 
import { promisify } from 'util'; 

const verifyToken = promisify(jwt.verify);

export const CheckAuthorization = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      // console.log(authHeader,'auth header')
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("unauthorized")
        return res.json({ success: false, message: 'Unauthorized: No token provided' });
      }

      const token = authHeader.split(' ')[1];
      const decodedToken = await verifyToken(token, process.env.JWT_SECRET);
      req.body.username = decodedToken.username;
      next()
    } catch (err) {
      res.json({ success: false, message: 'Unauthorized: Invalid token' });
    }
  };
