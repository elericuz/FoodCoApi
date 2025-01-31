import {decodeToken} from "../helpers/token.js";
import lodash from "lodash";

const _ = lodash

export const customMiddleware = (req, nes, next) => {
    const token = req.header('Authorization');
    const tokenParsed = checkToken(token)

    req.global = {
        tokenParsed
    }
    next();
}

const checkToken = (token) => {
    if (_.isUndefined(token)) {
        return false;
    }

    return decodeToken(token);
}