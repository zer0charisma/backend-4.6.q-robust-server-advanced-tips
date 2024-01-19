const ratings = require("../data/ratings-data");

function ratingExists(req, res, next) {
  const { ratingId } = req.params;
  const foundRating = ratings.find((rating) => rating.id === Number(ratingId));
  if (foundRating) {
    res.locals.rating = foundRating;
    return next();
  } next({
    status: 404,
    message: `Rating id not found: ${ratingId}`,
  });
};

function list(req, res) {
  console.log(req.params)
  const filteredRatings = ratings.filter(
    (rating) =>
      !req.params.noteId || rating.noteId == Number(req.params.noteId)
  );  
  res.json({ data: filteredRatings });
};

function read(req, res, next) {
  res.json({ data: res.locals.rating });
};

module.exports = {
  list,
  read: [ratingExists, read],
};