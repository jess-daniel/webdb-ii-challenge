const router = require("express").Router();

const db = require("../data/dbConfig");

router.get("/", (req, res) => {
  db("cars")
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      res.status(500).json({ error: "server error", err });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("cars")
    .where({ id })
    .first()
    .then(car => {
      res.status(200).json(car);
    })
    .catch(err => {
      res.status(500).json({ error: "server error", err });
    });
});

router.post("/", (req, res) => {
  const carData = req.body;
  if (carData) {
    db("cars")
      .insert(carData, "id")
      .then(ids => {
        const id = ids[0];

        return db("cars")
          .where({ id })
          .first()
          .then(car => {
            res.status(200).json(car);
          });
      })
      .catch(err => {
        res.status(500).json({ error: "server error", err });
      });
  } else {
    res.status(400).json({ message: "Please send valid car data" });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db("cars")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        return db("cars")
          .where({ id })
          .first()
          .then(car => {
            res.status(200).json(car);
          });
      } else {
        res.status(404).json({ message: "car with id not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "server error", err });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("cars")
    .where({ id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "Car successfully deleted" });
      } else {
        res.status(404).json({ message: "Car with ID can't be found" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "server error", err });
    });
});

module.exports = router;
