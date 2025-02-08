/* 
1-Product.find({price:{$gte50,$lte200}}).sort({price:1}).skip(skip).limit(10)
2-product.aggregate([{$sort:[electronic:-1]}]).skip(skip).limit(5)
3-
*/
