import "dotenv/config";
import { Client } from "pg";

const isDev = process.env.IS_DEV === "true";
const connectionString = isDev
  ? process.env.DEV_DIRECT_URL || process.env.DEV_DATABASE_URL
  : process.env.PROD_DIRECT_URL || process.env.PROD_DATABASE_URL;

if (!connectionString) {
  throw new Error("Database URL not configured");
}

async function main() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log("✓ Connected to database");

    // Create a test creator user
    await client.query(`
      INSERT INTO "User" (id, name, email, "role", "createdAt", "updatedAt")
      VALUES (
        gen_random_uuid(),
        'Course Creator',
        'creator@learning.com',
        'CREATOR',
        NOW(),
        NOW()
      )
      ON CONFLICT (email) DO NOTHING
    `);

    // Get the creator ID
    const userResult = await client.query(
      `SELECT id FROM "User" WHERE email = 'creator@learning.com' LIMIT 1`
    );
    const creatorId = userResult.rows[0]?.id;

    if (!creatorId) {
      throw new Error("Failed to create creator user");
    }

    // Create a test domain (learning course)
    await client.query(`
      INSERT INTO "Domain" (id, title, slug, description, "creatorId", published, "isFree", "createdAt", "updatedAt")
      VALUES (
        gen_random_uuid(),
        'Frontend Development Bootcamp',
        'frontend-bootcamp',
        'Learn HTML, CSS, JavaScript, and React from scratch',
        $1,
        true,
        true,
        NOW(),
        NOW()
      )
      ON CONFLICT (slug) DO NOTHING
    `, [creatorId]);

    // Get the domain ID
    const domainResult = await client.query(
      `SELECT id FROM "Domain" WHERE slug = 'frontend-bootcamp' LIMIT 1`
    );
    const domainId = domainResult.rows[0]?.id;

    if (!domainId) {
      throw new Error("Failed to create domain");
    }

    // Create a test section
    await client.query(`
      INSERT INTO "Section" (id, "domainId", title, description, "orderIndex", "createdAt", "updatedAt")
      VALUES (
        gen_random_uuid(),
        $1,
        'Week 1: HTML Basics',
        'Introduction to HTML structure and elements',
        0,
        NOW(),
        NOW()
      )
    `, [domainId]);

    // Get the section ID
    const sectionResult = await client.query(
      `SELECT id FROM "Section" WHERE title = 'Week 1: HTML Basics' AND "domainId" = $1 LIMIT 1`,
      [domainId]
    );
    const sectionId = sectionResult.rows[0]?.id;

    if (!sectionId) {
      throw new Error("Failed to create section");
    }

    // Create a test lesson
    await client.query(`
      INSERT INTO "Lesson" (id, "sectionId", title, description, "contentType", "orderIndex", "isFree", "createdAt", "updatedAt")
      VALUES (
        gen_random_uuid(),
        $1,
        'HTML Document Structure',
        'Learn the basic structure of an HTML document',
        'ARTICLE',
        0,
        true,
        NOW(),
        NOW()
      )
    `, [sectionId]);

    console.log("✓ Domain seeded successfully");
    console.log("  - Course: Frontend Development Bootcamp");
    console.log("  - Section: Week 1: HTML Basics");
    console.log("  - Lesson: HTML Document Structure");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    await client.end();
  }
}

main()
  .then(() => {
    console.log("Seeding completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });
