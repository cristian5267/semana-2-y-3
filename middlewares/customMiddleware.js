export const customMiddleware = (req, res, next) => {
    console.log("desde middleware");
    req.headers.myTime = new Date();
    next();
};
