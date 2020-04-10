const express = require("express");

const projects = require("../data/helpers/projectModel");
const actions = require("../data/helpers/actionModel");

const {
  validateProject,
  validateProjectId,
  validateAction,
} = require("../middleware");

const router = express.Router();

router.get("/", (req, res) => {
  projects
    .get()
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Your request could not be processed! ",
      });
    });
});

// Get Project by id

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

// Add a project

router.post("/", validateProject, (req, res) => {
  projects
    .insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Your request could not be processed. ",
      });
    });
});

// Add an action to a project

router.post("/:id/actions", [validateProjectId, validateAction], (req, res) => {
  const actionInfo = { ...req.body, project_id: req.params.id };
  actions
    .insert(actionInfo)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error: could not add post. " });
    });
});

// Delete a project

router.delete("/:id", validateProjectId, (req, res) => {
  projects
    .remove(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Your request could not be processed. ",
      });
    });
});

// Update a project

router.put("/:id", [validateProjectId, validateProject], (req, res) => {
  projects
    .update(req.params.id, req.body)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Your request could not be processed. ",
      });
    });
});

module.exports = router;
