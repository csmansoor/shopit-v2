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
}    


export default APIFilters;