class HTTPRes {
  constructor(codeParam,messageParam, nextParam=false) {
    this.code = codeParam;
    this.message = messageParam;
  }
  toObject() {
    return  {"message": this.message};
  }
}
class HTTPError extends HTTPRes {
  constructor(codeParam,messageParam) {
    super(codeParam,messageParam);
  }
  toObject() {
    return  {"error":this.message};
  }
}

function errorHandler(fn){
  return async (req, res, next) => {
      try {
          
          let httpResult = await fn(req,res,next);
          if (httpResult === "next") next();
          else res.status(httpResult.code).json(httpResult.message);
      } catch (error) {
          if (error instanceof HTTPError){
              try {
                  await fs.promises.unlink(`images/${req.file.filename}`)
              } catch (error){}
 
              return res.status(error.code).json(error.toObject());
          }
          else throw error
      }
  }
}
function checkValidity(req, values){
  for (value of values){

    if (req.body[value] === undefined) throw new HTTPError(400, value+" field is not provided")
  }
}
module.exports = {HTTPRes,HTTPError, errorHandler, checkValidity};