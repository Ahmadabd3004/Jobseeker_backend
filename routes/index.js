const router = require("express").Router();
const authentication = require("../middleware");
const Controller = require("../controllers/UserController");
const JobController = require("../controllers/JobListController");

router.post("/login", Controller.login);

router.use(authentication);

router.get("/getjob", JobController.jobList);
router.get("/jobDetails/:id", JobController.jobDetail);

module.exports = router;
