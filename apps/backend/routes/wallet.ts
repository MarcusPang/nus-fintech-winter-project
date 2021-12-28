import { Router } from "express";
import { exec } from "child_process";
const router = Router();

/* Deploy wallet to address supplied. (Node keeps running and doesn't terminate) */
router.get("/", function (req, res, next) {
  console.log("Setting up hardhat node and deploying...");
  const myShellScript = exec("cd ../contracts && yarn dev");
  myShellScript.stdout.on("data", (data) => {
    console.log(data);
  });
  myShellScript.stderr.on("data", (data) => {
    console.error(data);
  });
});

export default router;
