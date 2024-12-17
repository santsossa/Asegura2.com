// crear respuestas estandarizadas
export const createResponse = (req, res, statusCode, data, error= null, message="") =>{
    return res.status(statusCode).json({
        message,
        data, 
        status: statusCode,
        error,
        path: req.url        
    })
}