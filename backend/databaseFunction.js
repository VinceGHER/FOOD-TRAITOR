const {HTTPRes,HTTPError} = require('./error');
const fs = require('fs');
const { notify } = require('./routes/stuffRoute');
const e = require('express');


exports.findDocumentById = async function (Model,id){
    try {
        var doc = await Model.findById(id);
    } catch (error) {
        throw new HTTPError(400, error.message);
    }
    if (!doc) throw new HTTPError(404,Model.modelName+" not found")
    return doc;
}
exports.findDocumentOne = async function (Model,nameParam,valueParam){
    try {
        var doc = await Model.findOne({ [nameParam] : valueParam});
    } catch (error) {
        throw new HTTPError(400, error.message);
    }
    if (!doc) throw new HTTPError(404,Model.modelName+" not found")
    return doc;
}
exports.findDocument = async function (Model,nameParam,valueParam){
    try {
        var docs = await Model.find({ [nameParam] : valueParam});
    } catch (error) {
        throw new HTTPError(400, error.message);
    }
    if (!docs) throw new HTTPError(404,Model.modelName+" not found")
    return docs;
}
exports.findSubDocument = function (subDocs,id){
    try {
        var subDoc = subDocs.id(id);
    } catch (error) {
        throw new HTTPError(400, error.message);
    }
    if (!subDoc) throw new HTTPError(404,"subDocs non trouvée")
    return subDoc;

}
async function saveDocument(doc){
    try {
      return (await doc.save());
    } catch (error) {
      throw new HTTPError(400, error.message);
    }  
}
exports.saveDocument = saveDocument;

exports.removeFindSubDocument = async function (subDoc,table,value){
    try {
        subDoc[table] = subDoc[table].filter(a => a.toString() != value.toString())
    
    } catch (error) {
        throw new HTTPError(400, error.message);     
    }
    console.log(subDoc.ownerDocument)
    if (subDoc.ownerDocument !== undefined)
        await saveDocument(subDoc.ownerDocument());
    else
        await saveDocument(subDoc);
}
exports.removeSubDocument = async function (subDoc){
    try {
        subDoc.remove();   
    } catch (error) {
        throw new HTTPError(400, error.message);     
    }
    await saveDocument(subDoc.ownerDocument());
}
exports.removeDocument = async function (doc){
    try {
        var result = await doc.deleteOne();

    } catch (error) {
        throw new HTTPError(400, error.message);     
    }
    console.log(result);
    if (!result) throw new HTTPError(404, "doc not found");
}

exports.removeImage = async function (field){
    try {
        const filename = field.split('/images/')[1];
        
        await fs.promises.unlink(`images/${filename}`)
    } catch (error) {
      //  throw new HTTPError(400, error.message);   
    }
}
 function mealExits(categories, mealID) {
    for (const categorie of categories){
        for (const meal of categorie.mealList){
            console.log(meal._id);
            if(meal._id == mealID) return true;
        }
    }
    throw new HTTPError(400, "meal don't exist");   
}
exports.mealExits = mealExits;
