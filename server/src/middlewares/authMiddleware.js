import ErrorHandler from "../utils/ErrorHandler.js";

export const requireAuth = async (req, res, next) => {
  try {
    const userId = req.headers["clerk-user-id"]; // Clerk user ID from frontend request
    console.log(userId);

    if (!userId) {
      return next(new ErrorHandler("Unauthorized access. please log in", 401));
    }

    req.userId = userId; //Attaching the userId to request
    next();
  } catch (error) {
    next(new ErrorHandler("Authentication failed", 401));
  }
};
