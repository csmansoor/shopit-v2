class APIFilters {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

  search() {
    const keyword = this.queryStr.keyword
    ? {
         name: {
             $regex: this.queryStr.keyword,
             $options: "i", // Case-insensitive search
         },
    
}
: {};

console.log("Search Query Applied:", JSON.stringify(keyword, null, 2)); // Debugging



   this.query = this.query.find({...keyword });
   return this;

 }  

 filters() {
  const queryCopy = {...this.queryStr};
  // Fields to remove
 const fieldsToRemove = ["keyword","page"];
 fieldsToRemove.forEach((el) => delete queryCopy[el]);

 // Advance filter for price, ratings etc

 let querystr =JSON.stringify(queryCopy);
querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
 
 this.query = this.query.find(JSON.parse(querystr));
 return this;
}

 pagination(resPerPage) {
  const currentPage = Number(this.queryStr.page) || 1
  const skip = resPerPage = (currentPage - 1);

  this.query = this.query.limit(resPerPage).skip(skip);
  return this;
 }
}    


export default APIFilters;