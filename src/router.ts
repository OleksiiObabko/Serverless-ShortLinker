import {Router} from "express";

import {create, get} from "./controller";

const router = Router();

router.get("/:userId", get);
router.post("/", create);

export default router;
