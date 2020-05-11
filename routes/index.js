const express = require("express");
const router = express.Router();
const Recipe = require("../models").Recipe;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Recipe Book" });
});

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

//GET Recipes list
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const recipes = await Recipe.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.render("recipes/index", { recipes, title: " Recipebook" });
  })
);

// CREATE new recipes
router.get(
  "/new",
  asyncHandler(async (req, res) => {
    res.render("recipes/new", { recipe: {}, title: " Create Recipe" });
  })
);

// Post the new recipe

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const recipe = await Recipe.create(req.body);
    res.redirect("/recipes/" + recipe.id);
  })
);

//Edit the Recipe
router.get(
  "/:id/edit",
  asyncHandler(async (req, res) => {
    const recipe = await Recipe.findByPk(req.params.id);
    res.render("recipes/edit", { recipe: {}, title: " Edit Recipe" });
  })
);

//get one recipe

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const recipe = await Recipe.findByPk(req.params.id);
    res.render("recipes/show", { recipe, title: recipe.name });
  })
);

// UPDATE THE RECIPE

router.post(
  "/:id/edit",
  asyncHandler(async (req, res) => {
    const recipe = await Recipe.findByPk(req.params.id);
    await article.update(req.body);
    res.redirect("/recipes/" + recipe.id);
  })
);

// DELETE Step 1

router.get(
  "/:id/delete",
  asyncHandler(async (req, res) => {
    const recipe = await Recipe.findByPk(req.params.id);
    res.render("recipes/delete", { recipe, title: "Delete Article" });
  })
);

//DELETE Step 2 ( Actually deleting)

router.post(
  "/:id/delete",
  asyncHandler(async (req, res) => {
    const recipe = await Recipe.findByPk(req.params.id);
    await article.destory();
    res.redirect("/recipes");
  })
);

module.exports = router;
