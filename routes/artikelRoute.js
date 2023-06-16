import express from "express";
import artikelsController from "../controllers/artikelController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
router.get("/artikel", artikelsController.getArtikels);
router.get("/artikel/:id", artikelsController.getArtikelsById);
router.post(
  "/artikel",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  artikelsController.createArtikels
);
router.patch(
  "/artikel/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  artikelsController.updateArtikels
);
router.delete(
  "/artikel/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  artikelsController.deleteArtikels
);

export default router;
