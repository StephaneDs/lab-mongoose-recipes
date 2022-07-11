const mongoose = require("mongoose")

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model")
// Import of the data from './data.json'
const data = require("./data")

const recipeTiramisu = {
  title: "Tiramisu",
  level: "Amateur Chef",
  ingredients: [
    "568ml pot double cream",
    "250g tub mascarpone",
    "75ml marsala",
    "5 tbsp golden caster sugar",
    "300ml strong coffee, made with 2 tbsp coffee granules and 300ml boiling water",
    "175g pack sponge fingers",
    "25g dark chocolate",
    "2 tsp cocoa powder",
  ],
  dish: "desert",
  cuisine: "italian",
  time: 25,
}

const MONGODB_URI = "mongodb://localhost:27017/recipe-app"

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`)
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {})
  .catch((error) => {
    console.error("Error connecting to the database", error)
  })

async function seedDatabase() {
  try {
    // ! Delete everything from the database
    await Recipe.deleteMany()
    // ! Create the new data

    const createAllRecipes = await Recipe.insertMany(data)
    const createRecipeOne = await Recipe.create(RecipeOne)
    console.log(createRecipeOne.title)
    //////////Iteration 4 - Update recipe
    await Recipe.findOneAndUpdate(
      { title: "Asian Glazed Chicken Thighs" },
      { duration: 40 }
    )
    //////Iteration 5 - Remove a recipe
    await Recipe.deleteOne({ title: "Carrot Cake" })
    console.log("Carrot cake has been deleted")

    ////console log all the tittles of the recipes
    const allTitles = createAllRecipes.forEach((element) => {
      console.log(element.title)
    })
    // ! Disconnect
    ////mongoose.disconnect()
    // We can use process.exit() as well to quit the process.
  } catch (e) {
    console.error(e)
  }
  mongoose.disconnect()
}

seedDatabase()
