/*export class ApiFeatures {
  constructor(mongooseQuery, searchQuery) {
    this.mongooseQuery = mongooseQuery;
    this.searchQuery = searchQuery;
  }
  pagination() {
    let pageNumber = req.query.page * 1 || 1;
    if (this.searchQuery.page < 1) pageNumber = 1;
    const limit = 2;
    let skip = (parseInt(pageNumber) - 1) * limit;
    this.pageNumber = pageNumber;
    this.mongooseQuery.skip(skip).limit(limit);
    return this;
  }
}
*/
