const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const mongoose = require("mongoose");
const Book = require("../models/Book");

const categories = {
  Fiction: [
    ["The Midnight Library", "Matt Haig"],
    ["Lessons in Chemistry", "Bonnie Garmus"],
    ["Tomorrow, and Tomorrow, and Tomorrow", "Gabrielle Zevin"],
    ["Remarkably Bright Creatures", "Shelby Van Pelt"],
    ["Demon Copperhead", "Barbara Kingsolver"],
    ["The Covenant of Water", "Abraham Verghese"]
  ],
  "Mystery & Thriller": [
    ["The Housemaid", "Freida McFadden"],
    ["The Silent Patient", "Alex Michaelides"],
    ["Verity", "Colleen Hoover"],
    ["The God of the Woods", "Liz Moore"],
    ["First Lie Wins", "Ashley Elston"],
    ["The Last Thing He Told Me", "Laura Dave"]
  ],
  Romance: [
    ["Funny Story", "Emily Henry"],
    ["Happy Place", "Emily Henry"],
    ["Book Lovers", "Emily Henry"],
    ["Beach Read", "Emily Henry"],
    ["People We Meet on Vacation", "Emily Henry"],
    ["The Love Hypothesis", "Ali Hazelwood"]
  ],
  Fantasy: [
    ["Fourth Wing", "Rebecca Yarros"],
    ["Iron Flame", "Rebecca Yarros"],
    ["A Court of Thorns and Roses", "Sarah J. Maas"],
    ["A Court of Mist and Fury", "Sarah J. Maas"],
    ["The House in the Cerulean Sea", "TJ Klune"],
    ["The Invisible Life of Addie LaRue", "V.E. Schwab"],
    ["The Name of the Wind", "Patrick Rothfuss"]
  ],
  "Biography & Memoir": [
    ["Educated", "Tara Westover"],
    ["Becoming", "Michelle Obama"],
    ["The Light We Carry", "Michelle Obama"],
    ["Spare", "Prince Harry"],
    ["Greenlights", "Matthew McConaughey"],
    ["The Woman in Me", "Britney Spears"]
  ]
};

async function getCoverImage(title, author) {
  try {
    const query = new URLSearchParams({
      title,
      author,
      limit: "1"
    });

    const res = await fetch(`https://openlibrary.org/search.json?${query}`);
    const data = await res.json();

    if (data.docs && data.docs[0] && data.docs[0].cover_i) {
      return `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-L.jpg`;
    }

    return "";
  } catch {
    return "";
  }
}

async function buildBooks() {
  const books = [];

  for (const [category, items] of Object.entries(categories)) {
    for (let i = 0; i < items.length; i++) {
      const [title, author] = items[i];
      const coverImage = await getCoverImage(title, author);

      books.push({
        title,
        author,
        description: `${title} by ${author} is a popular ${category} book available at Lumina Books.`,
        category,
        price: Number((16.99 + i * 1.25).toFixed(2)),
        stock: 20 + i,
        coverImage,
        rating: Number((4.4 + (i % 5) * 0.1).toFixed(1))
      });
    }
  }

  return books;
}

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const books = await buildBooks();

    console.log("Books to seed:", books.length);

    await Book.deleteMany({});
    await Book.insertMany(books);

    console.log("✅ Real book covers seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seed();