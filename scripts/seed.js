/* mySeedScript.js */
// require the necessary libraries
const faker = require("faker");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const seedProducts = async () => {
  mongoose.connect(`mongodb://127.0.0.1:27017/shopping-cart`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  await db.once("open", function () {
    console.log("DB Connected");
  });
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);

  try {
    for (let i = 0; i < 500; i += 1) {
      const name = faker.commerce.productName();
      const brand = faker.company.companyName();
      const price = faker.commerce.price(5, 2000, 2, "$");
      const description = faker.lorem.paragraph(1);
      const availability = Math.ceil(Math.random() * 20);
      const weight = (Math.random() * 10).toFixed(1);
      const image = faker.image.imageUrl(400, 400, "business");

      let newProduct = {
        name,
        brand,
        price,
        description,
        availability,
        weight,
        image,
        itemsInCart: 0,
      };
      const product = new Product(newProduct);
      await product.save();
      console.log(product.name);
    }
  } catch (error) {
    console.log(error);
  }

  console.log("Database seeded! :)");

  mongoose.disconnect();
};
seedProducts();
