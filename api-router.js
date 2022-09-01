const router = require("express").Router();
const categoryController = require("./controllers/categoryController");
const bookController = require("./controllers/bookController");

const {check} = require("express-validator");

//http://localhost/api/category
router.route("/category").get(categoryController.list).post([check("name").notEmpty().withMessage("name alanı boş olamaz")], categoryController.create);
//http://localhost/api/category/12349816
router.route("/category/:category_id").put([check("name").notEmpty().withMessage("name alanı boş olamaz")],categoryController.update).delete(categoryController.delete).get(categoryController.getById);

var bookValidation = new Array(
    check("title").notEmpty().withMessage("başlık alanı boş olamaz."),
    check("author").notEmpty().withMessage("yazar alanı boş olamaz"),
    check("price").notEmpty().withMessage("fiyat alanı boş olamaz").isFloat().withMessage("fiyat değeri float olmalı"),
    check("stock").notEmpty().withMessage("stok bilgisi boş olamaz"),
    check("picture").notEmpty().withMessage("fotoğraf alanı boş olamaz"),
    check("categoryBy").notEmpty().withMessage("kategori alanı boş olamaz")
);
router.route("/book").get(bookController.list).post([bookValidation], bookController.create);
router.route("/book/:book_id").get(bookController.getById).put(bookController.update).delete(bookController.delete);

router.route("/books/:category_id").get(bookController.listByCategoryId);

router.route("/book/saveImage").post(bookController.upload.single("picture"), bookController.saveImage);

module.exports=router;