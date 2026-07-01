// import { ObjectId } from "mongodb";

// async function seedDatabase() {
//   try {
//     const db = await getDb();

//     // Clear the `users` collection before seeding
//     await db.collection("users").deleteMany({});

//     // Insert seed data into `users` collection
//     const users = [
//       {
//         _id: new ObjectId(), // Optional, MongoDB will auto-generate `_id` if omitted
//         name: "Admin User",
//         role: "admin",
//         contactNumber: "1234567890",
//         password: "securepassword", // Hash this in production!
//         isActive: true,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         _id: new ObjectId(),
//         name: "Regular User",
//         role: "desktop_user",
//         contactNumber: "0987654321",
//         password: "securepassword", // Hash this in production!
//         isActive: true,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     ];

//     // Insert the seed data
//     const result = await db.collection("users").insertMany(users);

//     console.log(`Seeded ${result.insertedCount} users successfully!`);
//   } catch (error) {
//     console.error("Error seeding the database:", error);
//   } finally {
//     process.exit(); // Ensure the script exits after completion
//   }
// }

// seedDatabase();
