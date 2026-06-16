const express = require("express");
const tourRouter = express.Router();
const {getAllTuors , getToursById , setPatchTours,setPostTours,deleteTourById, checkId} = require("../controller/tourController");


tourRouter.param('id',checkId)
// >>>>>>>>>>>>>>>>>>>Routes>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //   Routes Tours
tourRouter.route("/").get(getAllTuors).post(setPostTours)
tourRouter.route("/:id").get(getToursById).delete(deleteTourById).patch(setPatchTours)

module.exports= tourRouter;
