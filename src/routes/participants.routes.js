import { Router } from "express";
import {
    signInParticipants,
    signUpParticipants,
} from "../controllers/participants.controllers.js";

const router = Router();

// ROTAS:

router.post("/sign-up", signUpParticipants);

router.post("/sign-in", signInParticipants);

export default router;
