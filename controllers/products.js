const Product = require('../models/product');

const getAllProductsStatic = async(req,res) =>{
    const products = await Product.find({}).sort('name').select('name price');
    res.status(200).json({products, nbHits:products.length})
}

const getAllProducts = async(req,res)=>{
    let result;
    const {featured,company,name,sort,fields,numericFilters} = req.query ;
    const queryObject = {};let sortList,fieldList;
    if(featured){
        queryObject.featured = featured === 'true' ? true : false;
    }
    if(company){
        queryObject.company = company;
    }
    if(name){
        queryObject.name = {$regex : name, $options:'i'};
    }
    if(numericFilters){
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte'
        }
        let regEx = /\b(<|>|<=|>=|=)\b/g;
        let filters = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`);
        let options = ['price','rating'];
        filters = filters.split(',').forEach((item)=>{
            const [field,operator,value] = item.split('-');
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        })
        console.log(queryObject);
    }
    if(fields){
        fieldList  = fields.split(',').join(' ');
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10  
    const skip = (page - 1) * limit;
    //console.log(limit,skip)
    if(sort){
        sortList = sort.split(',').join(' ');
        result =  await Product.find(queryObject).sort(sortList).select(fieldList).skip(skip).limit(limit);
    }else{
        result =  await Product.find(queryObject).sort('createAt').select(fieldList).skip(skip).limit(limit);
    }
    // console.log(result)
    res.status(200).json({result,nbHits:result.length})
}

module.exports={
    getAllProductsStatic,
    getAllProducts
}