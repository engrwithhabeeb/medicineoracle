const { Client } = require("pg");

const connectionString = process.argv[2];

async function createTable(client) {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL
        );

        CREATE TABLE IF NOT EXISTS manufacturers (
            id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL
        );

        CREATE TABLE IF NOT EXISTS medicines (
            id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            category_id INTEGER NOT NULL,
            manufacturer_id INTEGER,

            CONSTRAINT fk_category
                FOREIGN KEY (category_id)
                REFERENCES categories(id)
                ON DELETE CASCADE,

            CONSTRAINT fk_manufacturer
                FOREIGN KEY (manufacturer_id)
                REFERENCES manufacturers(id)
                ON DELETE SET NULL
        );
    `;

  await client.query(createTableQuery);
}

async function insertSeedData(client) {
  const seedData = `
        INSERT INTO categories (name)
        VALUES
            ('Analgesics'),
            ('Antibiotics'),
            ('Antimalarials'),
            ('Antihistamines'),
            ('Antacids'),
            ('Vitamins & Supplements');

        INSERT INTO manufacturers (name)
        VALUES
            ('Emzor Pharmaceutical Industries'),
            ('Fidson Healthcare'),
            ('May & Baker Nigeria'),
            ('GSK'),
            ('Pfizer');

        WITH medicine_seed (
            name,
            category_name,
            manufacturer_name
        ) AS (
            VALUES
                (
                    'Paracetamol 500mg',
                    'Analgesics',
                    'Emzor Pharmaceutical Industries'
                ),
                (
                    'Ibuprofen 400mg',
                    'Analgesics',
                    'Fidson Healthcare'
                ),
                (
                    'Amoxicillin 500mg',
                    'Antibiotics',
                    'May & Baker Nigeria'
                ),
                (
                    'Artemether/Lumefantrine 20/120mg',
                    'Antimalarials',
                    'Emzor Pharmaceutical Industries'
                ),
                (
                    'Cetirizine 10mg',
                    'Antihistamines',
                    'GSK'
                ),
                (
                    'Omeprazole 20mg',
                    'Antacids',
                    'Pfizer'
                ),
                (
                    'Vitamin C 500mg',
                    'Vitamins & Supplements',
                    NULL
                )
        )
        INSERT INTO medicines (
            name,
            category_id,
            manufacturer_id
        )
        SELECT
            medicine_seed.name,
            categories.id,
            manufacturers.id
        FROM medicine_seed
        JOIN categories
            ON categories.name = medicine_seed.category_name
        LEFT JOIN manufacturers
            ON manufacturers.name = medicine_seed.manufacturer_name;
    `;

  await client.query(seedData);
}

async function seedDatabase(client) {
  await client.query("BEGIN");

  try {
    await createTable(client);

    await insertSeedData(client);

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  }
}

async function main() {
  console.log("Seeding...");

  const client = new Client({ connectionString });

  try {
    await client.connect();

    await seedDatabase(client);

    console.log("Seeding complete.");
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

main();
