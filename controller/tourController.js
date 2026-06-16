const fs = require("fs");
const path = require("path");

const pathToursSimple = path.join(
  __dirname,
  "../dev-data/data/tours-simple.json",
);

// help functions Tours>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const getDataFromToursSimple = () => {
  const toursData = fs.readFileSync(pathToursSimple);
  const toursDataJson = JSON.parse(toursData);
  return toursDataJson;
};
const dataTours = getDataFromToursSimple();

const getIdAndStauts = (req, res) => {
  const { id } = req.params;
  const idNum = parseInt(id);
  return { idNum };
};

const setDataToFile = (dataToSave) => {
  let writeStatus = true;
  const dataToursStrin = JSON.stringify(dataToSave);
  fs.writeFileSync(pathToursSimple, dataToursStrin, (err, data) => {});
};

// Moduleware to chck id ... 
exports.checkId= ( req,res,next,val) => {
       const idNum = parseInt(val)
        if (Number.isNaN(idNum) || idNum < 1 || idNum >= dataTours.length) {
             res.status(404).json({status: "failed", messag:"Invalid id"})
             return;
  }
       next();
} 

//  controller functions Tours.....
exports.getAllTuors = (req, res) => {
  res
    .status(200)
    .json({ status: "Success", length: dataTours.length, data: dataTours });
};

exports.getToursById = (req, res) => {
  const { idNum } = getIdAndStauts(req, res);
  const currentTour = dataTours.find((tour) => parseInt(tour.id) == idNum);
  if (!currentTour || currentTour === undefined) {
    res
      .status(200)
      .json({
        status: "Success",
        data: currentTour,
        messag: "No data to show",
      });
  } else {
    res
      .status(200)
      .json({ status: "Success", data: currentTour, messag: "Data is fine" });
  }
};

exports.setPatchTours = (req, res) => {
  const { idNum } = getIdAndStauts(req, res);
  const currentTour = dataTours.find((tour) => tour.id == idNum);
  if (!currentTour) {
    res.status(404).json({ status: false });
    return;
  }
  const patchTour = { ...currentTour, ...req.body };
  const updateTours = dataTours.map((tour) =>
    parseInt(tour.id) === idNum ? patchTour : tour,
  );
  const dataToStringfy = JSON.stringify(updateTours);
  setDataToFile(updateTours);
  res.status(200).json({ status: true, data: patchTour });
};

exports.setPostTours = (req, res) => {
  const id = dataTours[dataTours.length - 1].id + 1;
  const toursObj = Object.assign({ id }, req.body);
  dataTours.push(toursObj);
  const dataToStringfy = JSON.stringify(dataTours);
  setDataToFile(dataTours);
  res.json({ succss: true, data: toursObj });
};

exports.deleteTourById = (req, res) => {
  const { idNum } = getIdAndStauts(req, res);
  
  const filterObject = dataTours.find((tour) => parseInt(tour.id) === idNum);
  if (!filterObject) {
    res.json({ succss: false, messag: "No tour exist ." });
  }
  const filterTours = dataTours.filter((tour) => parseInt(tour.id) !== idNum);
  setDataToFile(filterTours);
  res.status(201).json({ status: true, data: filterTours });
};
