/* mySeedScript.js */
// require the necessary libraries
const faker = require("faker");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const Brand = require("../models/Brand");
const Department = require("../models/Department");
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
      const price = faker.random.number({
        min: 10,
        max: 1000,
      });
      const description = faker.lorem.paragraph(1);
      const department = faker.commerce.department();
      const availability = Math.ceil(Math.random() * 20);
      const weight = (Math.random() * 10).toFixed(1);
      const image = faker.image.imageUrl(400, 400, "business");

      let newProduct = {
        name,
        brand,
        price,
        description,
        department,
        availability,
        weight,
        image,
        itemsInCart: 0,
      };
      const product = new Product(newProduct);
      await product.save();
      const existingBrand = await Brand.findOne({ name: brand });
      if (existingBrand) {
        existingBrand.products.push(product);
      } else {
        const brandObj = {
          name: brand,
          description: faker.lorem.paragraph(2),
          products: [],
        };
        const newBrand = new Brand(brandObj);
        await newBrand.products.push(product);
        await newBrand.save();
      }
      const existingDepartment = await Department.findOne({ name: department });
      if (existingDepartment) {
        existingDepartment.products.push(product);
      } else {
        const departmentObj = {
          name: department,
          description: faker.lorem.paragraph(2),
          products: [],
        };
        const newDepartment = new Department(departmentObj);
        await newDepartment.products.push(product);
        await newDepartment.save();
      }
      console.log(product.name);
    }
  } catch (error) {
    console.log(error);
  }

  console.log("Database seeded! :)");

  mongoose.disconnect();
};
seedProducts();
