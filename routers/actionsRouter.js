const express = require("express");

const actions = require("../data/helpers/actionModel");
//const projects = require("../data/helpers/projectModel");

const {
  validateActionId,
  validateAction,
  //validateProjectId,
} = require("../middleware");

const router = express.Router();

// Get all actions

router.get("/", (req, res) => {
  actions
    .get()
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Your request could not be processed! ",
      });
    });
});

// Get action by id

router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

// Update action
router.put("/:id", [validateAction], (req, res) => {
  actions
    .update(req.params.id, req.body)
    .then((actionToUpdate) => {
      res.status(200).json(actionToUpdate);
    })
    .catch((err) => {
      res.status(500).json({
        message: "your request could not be processed ",
      });
    });
});

// Delete action

router.delete("/:id", validateActionId, (req, res) => {
  actions
    .remove(req.params.id)
    .then((actionToRemove) => {
      res.status(200).json(actionToRemove);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Your request could not be processed ",
      });
    });
});
module.exports = router;
