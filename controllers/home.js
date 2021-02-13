const Info = require('../models/home');

/*
exports.getAddInfo = (req, res) =>{
    res.render('admin/edit-info.ejs', {
        pageTitle: 'Add Info',
        path: '/admin/add-info',
        editing: false
    });
};    

exports.postAddInfo = (req, res) =>{
    const info = new Info(null,req.body.name,req.body.imageUrl,req.body.description);
    product.save();
    res.redirect('/');
    //koduleht on shop.html
};
*/

exports.getEditInfo = (req, res) =>{
    const editMode = true;
    const infoId = 1;

    Info.findById(infoId, info => { console.log(info)
        if(!info) {
            return res.redirect('/');
        }
        res.render('admin/edit-info.ejs', {
            pageTitle: 'Edit Info',
            path: '/admin/edit-info',
            editing: editMode,
            info: info
        });

    });
}; 

exports.postEditInfo = (req, res) => {
    const infoId = 1;
    const updatedName = req.body.name;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;

    const updatedInfos = new Info(infoId, updatedName, updatedImageUrl, updatedDescription);
    updatedInfos.save();
    //res.redirect('/admin/products');

};

exports.getInfos = (req, res) => {
    Info.fetchAll(infos => {
        res.render('admin/home.ejs',
        {
            infos: infos, 
            pageTitle: 'Admin Info',
            path: '/admin/home'
        }
        );
    });
};
