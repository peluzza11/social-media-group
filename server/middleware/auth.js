/*authorization*/
import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {  /*the "next" parameter will allow us to have the function continue*/
    try{
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};

/*The main purpose of the middleware folder is to modify the req and res objects, and then compile and execute any code that is required.*/