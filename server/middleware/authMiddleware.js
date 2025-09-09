import jwt from 'jsonwebtoken';

export const CheckAuthorization = async (req, res, next) => {

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split(' ')[1];
        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.error("Token verification failed", err);
                return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
            }

            req.body.username = decodedToken.username;
            next();
        });

    } catch (err) {
        console.error("Unexpected error in CheckAuthorization middleware:", err);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
