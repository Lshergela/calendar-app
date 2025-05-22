const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require('../middleware/auth');

// Get all events for current user
router.get('/', auth, async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user._id });
    res.send(events);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create new event
router.post('/', auth, async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      userId: req.user._id,
    });
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update event
router.patch('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!event) {
      return res.status(404).send();
    }

    Object.assign(event, req.body);
    await event.save();
    res.send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete event
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!event) {
      return res.status(404).send();
    }

    res.status(204);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
