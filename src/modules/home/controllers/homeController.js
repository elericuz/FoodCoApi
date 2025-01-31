export const index = async (req, res, next) => {
    res.status(200).json({
        message: "Welcome to A Food Store API",
        success: true
    })
}

export const errorPage = async (req, res, next) => {
    res.status(404).json({
        message: "Something went wrong.",
        success: false
    });
}