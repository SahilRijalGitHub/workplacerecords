const express = require("express");
const router = express.Router();
const { Employee_table } = require("../models");

router.get("/", async (req, res) => {
  const all_table = await Employee_table.findAll();
  res.json(all_table);
});

router.get("/byID/:id", async (req, res) => {
  const id = req.params.id;
  const employee = await Employee_table.findByPk(id);
  res.json(employee);
});

router.post("/", async (req, res) => {
  const employee = req.body;
  await Employee_table.create(employee);
});

router.put("/byID/:id", async (req, res) => {
  const id = req.params.id;
  await Employee_table.update(req.body, {
    where: { id: id },
  });
});

router.delete("/byID/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Attempt to delete the employee
    const result = await Employee_table.destroy({
      where: { id: id },
    });

    if (result === 1) {
      // If result is 1, it means one record was deleted (success)
      res.status(200).json({ message: "Employee deleted successfully." });
    } else {
      // If result is 0, it means no records were deleted (not found)
      res.status(404).json({ message: "Employee not found." });
    }
  } catch (error) {
    // Handle other errors
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
