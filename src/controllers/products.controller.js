import Product from '../models/Product';

export const createProduct = async (req, res) => {
    //console.log(req.body);
    const {name, category, price, imgUrl} = req.body;
    const newProduct = new Product({name, category, price, imgUrl});
    const productSaved = await newProduct.save();
    res.status(201).json(productSaved);
}

export const getProducts = async (req, res) => {
    const products = await Product.find({}).sort({date: 'desc'});
    //console.log(products);
    res.json(products);
}

export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.productId);
    //console.log(product);
    res.status(200).json(product);
}

export const updateProductById = async (req, res) => {
    //const {name, category, price, imgUrl} = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true //porque mongoose obtiene por default retorna el producto viejo y con este parametro retornaria el nuevo
    });
    //console.log(product);
    res.status(200).json(updatedProduct);
}

export const deleteProductById = async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
    //console.log(req.params.id);
    //const products = await Product.find({}).sort({date: 'desc'});
    res.status(204).json('{}');
}