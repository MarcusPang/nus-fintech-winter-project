"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const child_process_1 = require("child_process");
const router = (0, express_1.Router)();
/* Deploy wallet to address supplied. (Node keeps running and doesn't terminate) */
router.get("/", function (req, res, next) {
    console.log("Setting up hardhat node and deploying...");
    const myShellScript = (0, child_process_1.exec)("cd ../contracts && yarn dev");
    myShellScript.stdout.on("data", (data) => {
        console.log(data);
    });
    myShellScript.stderr.on("data", (data) => {
        console.error(data);
    });
});
exports.default = router;
