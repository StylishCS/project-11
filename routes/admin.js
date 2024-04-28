const path = require("path");

const express = require("express");
const AdminPrivileges = require("../middlewares/protectAdmin");

const adminController = require("../controllers/admin");
const { loginAdminController } = require("../controllers/adminAuthController");

const router = express.Router();

router.post("/login", loginAdminController);

// /admin/add-product => GET
router.get("/add-product", AdminPrivileges, adminController.getAddProduct);

// /admin/products => GET
router.get("/products", AdminPrivileges, adminController.getProducts);

// /admin/add-product => POST
router.post("/add-product", AdminPrivileges, adminController.postAddProduct);

router.get(
  "/edit-product/:productId",
  AdminPrivileges,
  adminController.getEditProduct
);

router.post("/edit-product", AdminPrivileges, adminController.postEditProduct);

router.post(
  "/delete-product",
  AdminPrivileges,
  adminController.postDeleteProduct
);

module.exports = router;
