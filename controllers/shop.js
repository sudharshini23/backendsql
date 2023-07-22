const Product = require('../models/product');
const Cart = require('../models/cart');

// exports.getProducts = (req, res, next) => {
//   Product.fetchAll(products => {
//     res.render('shop/product-list', {
//       prods: products,
//       pageTitle: 'All Products',
//       path: '/products'
//     });
//   });
// };

exports.getProducts = (req,res,next) => {
  Product.fetchAll()
  .then(([rows, fieldData]) => {
    res.render('shop/product-list', {
      prods: rows[0],
      pageTitle: 'All Products',
      path: '/products'
    })
  })
  .catch(err => console.log(err))
}

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

exports.getProduct = (req,res,next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then(([rows]) => {
    res.render('shop/product-detail', {
      product: rows[0],
      pageTitle: rows.title,
      path: '/products'
    });
  })
}

// exports.getIndex = (req, res, next) => {
//   Product.fetchAll(products => {
//     res.render('shop/index', {
//       prods: products,
//       pageTitle: 'Shop',
//       path: '/'
//     });
//   });
// };

exports.getIndex = (req,res,next) => {
  Product.fetchAll()
  .then(([rows, fieldData]) => {
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err => console.log(err))
}

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

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll()
    .then(([rows,fieldContent]) => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: rows
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

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

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
