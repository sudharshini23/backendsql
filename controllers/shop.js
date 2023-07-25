const Product = require('../models/product');
const Cart = require('../models/cart');

// ******************************************
// GET PRODUCTS :

// -----------------------------------------------------
// exports.getProducts = (req, res, next) => {
//   Product.fetchAll(products => {
//     res.render('shop/product-list', {
//       prods: products,
//       pageTitle: 'All Products',
//       path: '/products'
//     });
//   });
// };

// ---------------------------------------------------------------
// NEED TO GET DETAILS OF ALL PRODUCTS PRESENT i.e. PRODUCTS page
exports.getProducts = (req,res,next) => {
  Product.findAll()
  .then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err => {
    console.log(err);
  })
}

// ***********************************************
// GET DETAILS OF ONLY A SINGLE PRODUCT:

// ------------------------------------------------
// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId;
//   Product.findById(prodId, product => {
//     res.render('shop/product-detail', {
//       product: product,
//       pageTitle: product.title,
//       path: '/products'
//     });
//   });
// };

// --------------------------------------------------------

exports.getProduct = (req,res,next) => {
  const prodId = req.params.productId;
  // const prodId = req.body.imageUrl;
  console.log(prodId);
  // Product.findAll({where: {id: prodId}})
  // .then(products => {
  //   res.render('shop/product-detail', {
  //     product: products[0],
  //     pageTitle: products[0].title,
  //     path: '/products'
  //   });
  // })
  // .catch(err => console.log(err));
  
  Product.findByPk(prodId)
  .then(rows => {
    // console.log(rows);
    res.render('shop/product-detail', {
      product: rows,
      pageTitle: rows.title,
      path: '/products'
    });
  })
  .catch(err => console.log(err));
  

  // Product.findById(prodId)
  // .then(([rows]) => {
  //   res.render('shop/product-detail', {
  //     product: rows[0],
  //     pageTitle: rows.title,
  //     path: '/products'
  //   });
  // })
}
// ------------------------------------------------------

// *******************************************************
// THIS BELOW METHOD IS TO GET PRODUCTS TO LOAD ON ------------------------------------------------------------
// exports.getIndex = (req, res, next) => {
//   Product.fetchAll(products => {
//     res.render('shop/index', {
//       prods: products,
//       pageTitle: 'Shop',
//       path: '/'
//     });
//   });
// };

// ------------------------------------------------------------
// THIS BELOW METHOD IS TO GET PRODUCTS TO LOAD ON /  i.e localhost:3000 page
exports.getIndex = (req,res,next) => {
  Product.findAll()
  .then(products => {
      res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err => {
    console.log(err);
  })
  // Product.fetchAll()
  // .then(([rows, fieldData]) => {
  //   res.render('shop/index', {
  //     prods: rows,
  //     pageTitle: 'Shop',
  //     path: '/'
  //   });
  // })
  // .catch(err => console.log(err))
}
// ------------------------------------------------------

// ***********************************************************
// CART PRODUCTS -----------------------------------------------
// WHY IS THIS METHOD CHNAGED, SINCE WE ARE NOT SURE CART IS LOADED AFTER DELETION ANYWAYS
// exports.getCart = (req, res, next) => {
//   Cart.getCart(cart => {
//     Product.fetchAll(products => {
//       const cartProducts = [];
//       for (product of products) {
//         const cartProductData = cart.products.find(
//           prod => prod.id === product.id
//         );
//         if (cartProductData) {
//           cartProducts.push({ productData: product, qty: cartProductData.qty });
//         }
//       }
//       res.render('shop/cart', {
//         path: '/cart',
//         pageTitle: 'Your Cart',
//         products: cartProducts
//       });
//     });
//   });
// };

// ----------------------------------------
exports.getCart = (req,res,next) => {
  req.user.getCart()
  .then(cart => {
    // console.log(cart);
    return cart.getProducts()
    .then(products =>  {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
}
// -----------------------------------------

// -----------------------------------------
// exports.getCart = (req, res, next) => {
//   Cart.getCart(cart => {
//     Product.fetchAll()
//     .then(([rows,fieldContent]) => {
//       res.render('shop/cart', {
//         path: '/cart',
//         pageTitle: 'Your Cart',
//         products: rows
//       });
//     });
//   });
// };

// *************************************************
// ADDING OR POSTING THE ITEMS INTO CART ------------------------------------------------------
// exports.postCart = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findById(prodId, product => {
//     Cart.addProduct(prodId, product.price);
//   });
//   res.redirect('/cart');
// };
// --------------------------------------------------

// --------------------------------------------------
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user.getCart()
  .then(cart => {
    fetchedCart = cart;
    return cart.getProducts({ where: { id: prodId } });
  })
  .then(products => {
    let product;
    if(products.length > 0) {
      product = products[0];
    }
    // let newQuantity = 1;
    if(product) {
      // get old quantity of product
      let oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity + 1;
      return product;
    }
    // no product
    return Product.findByPk(prodId)
  })
  .then(product => {
    return fetchedCart.addProduct(product, { through: { quantity: newQuantity }});
  })
  .then(() => {
    res.redirect('/cart');
  })
  .catch(err => {
    console.log(err);
  })
};
// --------------------------------------------------

// *************************************************
// AFTER DELETING ITEMS FROM CART ------------------------------------------------------
// exports.postCartDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findById(prodId, product => {
//     Cart.deleteProduct(prodId, product.price);
//     res.redirect('/cart');
//   });
// };
// ---------------------------------------------------

// --------------------------------------------------
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // let fetchedCart;
  req.user.getCart()
  .then(cart => {
    // fetchedCart = cart;
    return cart.getProducts({where: {id: prodId}});
  })
  .then(products => {
    const product = products[0];
    return product.cartItem.destroy();
    // let product;
    // if(products.length > 0) {
    //   product = products[0];
    // }

    // if(product) {
    //   Product.destroy({ where: { id: product.id }})
    // }
    // res.redirect('/cart');
  })
  .then(result => {
    res.redirect('/cart');
  })
  .catch(err => {
    console.log(err);
  })
};

// *************************************************
// SHOULDNT THIS BE THE METHOD??????
// exports.postCartDeleteProduct = (req,res,next) => {
//   const prodId = req.body.productId;
//   Product.findById(prodId)
//   .then(([rows, fieldContent]) => {
//     Cart.deleteProduct(prodId, rows[0].price);
//     res.redirect('/cart');
//   })
//   .catch(err => console.log(err))
// }

// // *************************************************
// GETTING ALL ORDERS -------------------------------------------
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

// *************************************************
// TO PROCEED TO CHECKOUT --------------------------------------
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
