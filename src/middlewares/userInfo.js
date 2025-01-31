export const userInfo = (req, res, next) => {
    const xUserId = req.header('X-User-Id');

    let uid = null;
    if (xUserId) {
        uid = xUserId
    }

    req.uid = uid;

    next();
}