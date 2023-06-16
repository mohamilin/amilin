// routes/komentarRoutes.js
import express from "express";
import komentarController from "../controllers/komentarController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
router.get("/komentar", komentarController.getKomentar);
router.post(
  "/komentar",
  [authMiddleware.verifyToken],
  komentarController.createKomentar
);
router.patch(
  "/komentar/:id",
  [authMiddleware.verifyToken],
  komentarController.updateKomentar
);
router.delete(
  "/komentar/:id",
  [authMiddleware.verifyToken],
  komentarController.deleteKomentar
);
router.get(
  "/artikel/:artikelId/komentar",
  komentarController.getKomentarByArtikel
);

export default router;
