import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// const prisma = new PrismaClient({ log: ["info"] });

async function main() {
  await prisma.post.deleteMany({
    where: {
      writtenById: "ee8de458-00b4-4b3b-a5c2-d2990c896926",
    },
  });
  await prisma.user.deleteMany();
  const user = await prisma.user.create({
    data: {
      name: "ali",
      email: "mars",
      age: 23,
      userPrefrence: {
        create: {
          emailUpdate: true,
          darkMode: false,
        },
      },
      writtenPost: {
        create: {
          title: "testing",
          rating: 3.2,
        },
      },
    },
    include: {
      userPrefrence: true,
      writtenPost: true,
      faviourtedPosts: true,
    },
  });

  console.log(user);

  // // CREATING
  // const user = await prisma.user.create({
  //   data: {
  //     // press ctrl+space to get options
  //     name: "ali",
  //     email: "ali2",
  //     age: 23,
  //     // we also write crud quries of the models that uses the refernces of the user
  //     userPrefrence: {
  //       create: {
  //         emailUpdate: false,
  //       },
  //     },
  //   },
  //   /*  include: {
  //     userPrefrence: true,
  //   }, */
  //   // we can also use the Select the to select the specfic things (but we can either use te include and select)
  //   select: {
  //     name: true,
  //     age: true,
  //     userPrefrence: true,
  //   },
  // });
  // console.log("user", user);
  // const multipleUsers = await prisma.user.createMany({
  //   data: [
  //     { name: "sally", email: "ali234", age: 1 },
  //     { name: "bugs", email: "dfjads", age: 33 },
  //   ],
  // });
  // console.log(multipleUsers);
  // /*   const post = await prisma.post.create({
  //   data: {
  //     rating: 3.3,
  //     title: "Test",
  //     writtenById: "19731640-b1a5-4c16-823c-21116f8faf9b",
  //   },
  // }); */
  // // READING
  // // we can find by the property which is not have unique attribute
  // const findUnique = await prisma.user.findUnique({
  //   where: {
  //     email: "ali2",
  //   },
  //   include: {
  //     userPrefrence: true,
  //   },
  // });
  // console.log("findUnique", findUnique);
  // // For unique constraints
  // // to find by using the unique constraint that we defined in our schema
  // const findUniqueByConstraint = await prisma.user.findUnique({
  //   where: {
  //     name_email: {
  //       name: "ali",
  //       email: "ali2",
  //     },
  //   },
  // });
  // console.log(findUniqueByConstraint);
  // const findByNormalProperty = await prisma.user.findFirst({
  //   where: {
  //     name: "bugs",
  //   },
  // });
  // console.log(findByNormalProperty);
  // await prisma.user.createMany({
  //   data: [
  //     { name: "sally", email: "ali235", age: 2 },
  //     { name: "sally", email: "ali236", age: 3 },
  //   ],
  // });
  // const findMultipleByNormalProperty = await prisma.user.findMany({
  //   where: {
  //     name: "sally",
  //   },
  //   // distinct mean return those records whose given property in the array is not same as other record e.g if age is different from others also give this user etc
  //   //  distinct: ["age"],
  //   orderBy: {
  //     age: "asc",
  //   },
  //   // For pagination
  //   take: 2,
  //   skip: 1,
  // });
  // console.log(findMultipleByNormalProperty);
  // // some operators for where
  // const findMultipleByOptions = await prisma.user.findMany({
  //   where: {
  //     /*   name: { equals: "bugs" },
  //     name: { not: "bugs" },
  //     name: { in: ["bugs", "ali"] },
  //     age: { gte: 25 },
  //     email: { endsWith: "a" }, */
  //     AND: [{ name: { startsWith: "ali" } }, { age: { lte: 25 } }],
  //   },
  // });
  // console.log(findMultipleByOptions);
  // const findOnRelation = await prisma.user.findMany({
  //   where: {
  //     userPrefrence: {
  //       emailUpdate: false,
  //     },
  //   },
  // });
  // console.log(findOnRelation);
  // const findOnRelationProperty = await prisma.user.findMany({
  //   where: {
  //     writtenPost: {
  //       // if every written post of a user has title test than return that user in the result
  //       every: { title: "Test" },
  //       // if none of the post of a user has title test than reuturn user
  //       none: { title: "Test" },
  //       // if any of the post of user has title test than return user
  //       some: { title: "Test" },
  //     },
  //   },
  // });
  // // relationShip filtering
  // const getPostsByAge = await prisma.post.findMany({
  //   where: {
  //     // written is also a user so here is the age property avilable
  //     writtenBy: {
  //       is: {
  //         age: { lte: 20 },
  //       },
  //     },
  //   },
  // });
  // // UPDATING
  // const newName = await prisma.user.update({
  //   where: {
  //     email: "ali235",
  //   },
  //   data: {
  //     name: "Tony Pro",
  //   },
  // });
  // console.log(newName);
  // const updateMultiple = await prisma.user.updateMany({
  //   where: {
  //     name: "sally",
  //   },
  //   data: {
  //     name: "Torvalds",
  //   },
  // });
  // console.log(updateMultiple);
  // const newAge = await prisma.user.update({
  //   where: {
  //     email: "dfjads",
  //   },
  //   data: {
  //     age: {
  //       increment: 2,
  //       /*     decrement: 33,
  //       divide: 33,
  //       multiply: 34, */
  //     },
  //   },
  // });
  // // relations connect
  // const Prefrence = await prisma.userPrefrence.create({
  //   data: { emailUpdate: false },
  // });
  // console.log("Prefrence", Prefrence);
  // // connecting the user to already created prefrence using the id
  // const userConnectedToPrefrence = await prisma.user.update({
  //   where: {
  //     email: "dfjads",
  //   },
  //   data: {
  //     name: "hitman",
  //     userPrefrence: {
  //       connect: {
  //         id: "4fc3e270-3f37-428f-b4ab-f6e072906117",
  //       },
  //       // disconnect from a relation
  //       // in one to one relationShip id is not required
  //       // disconnec:true
  //     },
  //   },
  // });
  // console.log("userConnectedToPrefrence", userConnectedToPrefrence);
  // const getPrefrencedUser = await prisma.user.findFirst({
  //   where: {
  //     name: "hitman",
  //   },
  //   include: {
  //     userPrefrence: true,
  //   },
  // });
  // console.log(getPrefrencedUser);
  // // DELETING
  // const deleteUser = await prisma.user.delete({
  //   where: {
  //     email: "dfjads",
  //     // age:{gte:20}
  //   },
  // });
  // // we can also delete many using the delteMany and also apply any filtering
}
main()
  .catch((err) => console.error(err.message))
  .finally(async () => prisma.$disconnect());
