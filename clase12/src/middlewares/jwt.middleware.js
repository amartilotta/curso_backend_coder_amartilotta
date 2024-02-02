import jwt from 'jsonwebtoken';
const JWT_SECRET = 'jwtSECRET'


//  -  Recuperando datos token por req.user
export const jwtValidation = (req,res,next)=>{
    try {
        // Recorda pasarle el Bearer token al header de la request
        const authHeader = req.get('Authorization')
        const token = authHeader.split(" ")[1];//Aislo la aprte del token que tienen los datos que me interesa
        const responseToken = jwt.verify(token, JWT_SECRET); // Desencripta la informacion que me viene del token
        req.user = responseToken;
        next();
    } catch (error) {
        res.status(500).json({error})
    }
}

//   -  Recuperando datos token por cookies   AVERIGUAR COMO HACERLO
// export const jwtValidation = (req,res,next)=>{
//     try {
//         console.log("soy el log req.cookies.token",req.cookies.token);
//         const authHeader = req.cookie.token
//         console.log("soy el log authHeader",authHeader);
//         const token = authHeader.split(" ")[1];//Aislo la aprte del token que tienen los datos que me interesa
//         const responseToken = jwt.verify(token, JWT_SECRET); // Desencripta la informacion que me viene del token
//         req.user = responseToken;
//         next();
//     } catch (error) {
//         console.log("entre al error jwt");
//         res.status(500).json({error})
//     }
// }