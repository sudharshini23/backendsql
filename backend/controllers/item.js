const Item = require('../models/details');

const getItemDetails = async (req,res,next) => {
    try {
        const items = await Item.findAll();
        res.status(200).json({items: items});
    }
    catch(err) {
        console.log('Cant find item details', JSON.stringify(err));
        res.status(500).json({error: err})
    }
}

const postItemDetails = async (req,res,next) => {
    try {
        // console.log(req.body);
        // if(!req.body.itemname) {
        //     throw new Error('Item name is mandatory!')
        // }
        // if(!req.body.price) {
        //     throw new Error('Price is mandatory')
        // }
        // if(!req.body.quantity) {
        //     throw new Error('Quantity is mandatory')
        // }
        const itemname = req.body.itemname; 
        const description = req.body.description;
        const price = req.body.price;
        const quantity = req.body.quantity;

        const newItem = await Item.create({
            itemName: itemname,
            description: description,
            price: price,
            quantity: quantity
        });

        console.log(newItem);

        res.status(201).json({items: newItem});
    }
    catch(err){
        res.status(500).json({error: err})
    }
}


// ------------------------------------------------------
const buyProducts = async (req,res,next) => {
    try {
        const itemId = req.params.id;
        const itemname = req.body.name;
        const description = req.body.desc;
        const price = req.body.price;
        const quantity = req.body.qty;
        if(quantity > 0) {
            const updatedItems = await Item.update({
                itemName: itemname,
                description: description,
                price: price,
                quantity: quantity,
                returning: true
            },
            {
                where: {id: itemId}
            })
            const itemnew = await Item.findByPk(itemId);
            res.status(200).json({items: itemnew});
        }
        else {
            await Item.destroy({where:{id:itemId}});
            return res.status(200);
        }
        // const updatedQuantity = await Item.update({
        //     itemName: req.body.itemname,
        //     description: req.body.description,
        //     price: req.body.price,
        //     quantity: req.body.quantity - 1,
        // },
        // {
        //     where: { id: itemId},
        // })
        // res.status(200).json({items: updatedQuantity});
    }
    catch(err){
        res.status(500).json({error: err})
    }

    // -------------------------------------
    // const updatedQuantity = req.body.quantity - 1;
    // const item = await Item.findByPk(itemId)
    // .then(item => {
    //     item.quantity = updatedQuantity;
    //     return item.save();
    // })
    // .then(result => {
    //     res.status(200).json({items: result});
    // })
    // .catch(err => {
    //     res.status(500).json({error: err});
    // })
}

// const addTwo = async (req,res,next) => {
//     try {
//         const itemId = req.params.id;
//         const updatedQuantity = await Item.update({
//             itemName: req.body.itemname,
//             description: req.body.description,
//             price: req.body.price,
//             quantity: req.body.quantity - 2,
//         },
//         {
//             where: { id: itemId},
//         })
//         res.status(200).json({items: updatedQuantity});
//     }
//     catch(err){
//         res.status(500).json({error: err})
//     }
     
//     // ------------------------------------------
//     // const itemId = req.params.id;
//     // const updatedQuantity = req.body.quantity - 2;
//     // Item.findByPk(itemId)
//     // .then(item => {
//     //     item.quantity = updatedQuantity;
//     //     return item.save();
//     // })
//     // .then(result => {
//     //     res.status(200).json({items: result});
//     // })
//     // .catch(err => {
//     //     res.status(500).json({error: err});
//     // })
// }

// const addThree = async (req,res,next) => {
//     try {
//         const itemId = req.params.id;
//         const updatedQuantity = await Item.update({
//             itemName: req.body.itemname,
//             description: req.body.description,
//             price: req.body.price,
//             quantity: req.body.quantity - 3,
//         },
//         {
//             where: { id: itemId},
//         })
//         res.status(200).json({items: updatedQuantity});
//     }
//     catch(err){
//         res.status(500).json({error: err})
//     }

//     // ---------------------------------------------
//     // const itemId = req.params.id;
//     // const updatedQuantity = req.body.quantity - 3;
//     // Item.findByPk(itemId)
//     // .then(item => {
//     //     item.quantity = updatedQuantity;
//     //     return item.save();
//     // })
//     // .then(result => {
//     //     res.status(200).json({items: result});
//     // })
//     // .catch(err => {
//     //     res.status(500).json({error: err});
//     // })
// }

module.exports = {
    getItemDetails,
    postItemDetails,
    buyProducts
}