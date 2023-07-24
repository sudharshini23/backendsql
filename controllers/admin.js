const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};


// THIS METHOD IS USED TO ADD PRODUCTS TO THE PAGE
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
  .createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
  .then(result => {
    console.log('Created new product');
    res.redirect('/admin/products');
  })
  .catch(err => {
    console.log(err);
  })
  // const product = new Product(null, title, imageUrl, description, price);
  // product
  // .save()
  // .then(res.redirect('/'))
  // .catch(err => console.log(err));
  // // res.redirect('/');

  // Product.create({
  //   title: title,
  //   price: price,
  //   imageUrl: imageUrl,
  //   description: description,
  //   userId: req.user.id
  // })

  
};

// TO EDIT PRODUCTS THAT ARE DISPLAYED ON ADMIN PRODUCTS PAGE
// AFTER CLICKING EDIT BUTTON WHICH DISPLAYS ON PRODUCT DETAILS PAGE
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
  .then(products => {
    if (!products) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: products
    });
  })
  .catch(err => {
    console.log(err);
  })

  // Product.findById(prodId, product => {
  //   if (!product) {
  //     return res.redirect('/');
  //   }
  //   res.render('admin/edit-product', {
  //     pageTitle: 'Edit Product',
  //     path: '/admin/edit-product',
  //     editing: editMode,
  //     product: product
  //   });
  // });
};

// AIN EDIT PAGE, AFTER UPDATING ALL DETAILS, WHEN WE CLICK "UPDATE PRODUCT", SHOULD LEAD TO THIS
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
  .then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imageUrl = updatedImageUrl;
    product.description = updatedDesc;
    return product.save();
  })
  .then(result => {
    console.log('UPDATED PRODUCT');
    res.redirect('/admin/products');
  })
  .catch(err => {
    console.log(err)
  })
  // const updatedProduct = new Product(
  //   prodId,
  //   updatedTitle,
  //   updatedImageUrl,
  //   updatedDesc,
  //   updatedPrice
  // );
  // updatedProduct.save();
  // res.redirect('/admin/products');
};


// THIS METHOD IS USED TO DISPLAY ALL PRODUCTS PRESENT IN SITE
exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err => {
    console.log(err);
  })
  // Product.fetchAll(products => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products'
  //   });
  // });
};

// DELETE BUTTON
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
  .then(product => {
    return product.destroy();
  })
  .then(result => {
    console.log('DESTROYED PRODUCT');
    res.redirect('/admin/products');
  })
  .catch(err => {
    console.log(err);
  })
};
