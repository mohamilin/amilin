// routes/kontribusiRoutes.js
import express from "express";
import kontribusiController from "../controllers/kontribusiController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
router.get(
  "/kontribusi",
  [authMiddleware.verifyToken],
  kontribusiController.getKontribusi
);
router.get("/kontribusi/:id", kontribusiController.getKontribusiById);
router.post(
  "/kontribusi",
  [authMiddleware.verifyToken],
  kontribusiController.createKontribusi
);

export default router;
