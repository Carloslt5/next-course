import prisma from "./../lib/prisma";
import { initialData } from "./seed";
import { countries } from "./seed-countries";

async function main() {
  //Delete data in databse
  await prisma.userAddress.deleteMany();
  await prisma.country.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const { categories, products, users } = initialData;

  //Create countries
  await prisma.country.createMany({ data: countries });

  //Create users
  await prisma.user.createMany({ data: users });

  //Create Categories
  const categoriesData = categories.map((category) => ({ name: category }));
  await prisma.category.createMany({ data: categoriesData });

  //Map categories with IDs
  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>); // Ex: {shirts: 'f862fe28-2a34-41eb-a406-d9725e192a4f'},

  //Create products
  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        //Relation name type with Category ID
        categoryId: categoriesMap[type],
      },
    });

    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log("Seed success!!");
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
