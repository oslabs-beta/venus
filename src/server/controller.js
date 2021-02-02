const authController = {};

/**
 * Controller function to be included in all API handlers in order to ensure 
 * proper authorization. 
 * The reason for this approach vs. defining a global middleware function is to avoid functional collission with socket.io handler 
 * 
 */
authController.verify = (req, res, next) => {
  //  get the token stored in the customer header called 'x-auth-token'
  const token = req.get('x-auth-token');
  // send error message if no token is found
  if (!token) {
    return res.sendStatus(401).json({
      error: 'Access denied! Missing token...',
    });
  }
  try {
    /**
     * if incoming request has a valid token, extract the payload from
     * the token and attach it to the request object
     */
    const payload = jwt.verify(token, ACCESS_SECRET);
    req.serverIP = payload.serverIP;
    return next();
  } catch (error) {
    return res.status(401).json({ error });
  }
};

module.exports = authController;
