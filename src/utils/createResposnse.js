// crear respuestas estandarizadas
export const createResponse = (req, res, statusCode, data, error= null) =>{
    return res.status(statusCode).json({
        message,
        data, 
        status: statusCode,
        error,
        path: req.url        
    })
}