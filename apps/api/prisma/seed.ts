import { PrismaClient } from '../generated/prisma/client';
import { createPrismaAdapter } from './client';

const prisma = new PrismaClient({ adapter: createPrismaAdapter() });

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const categories = [
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Audio', slug: 'audio' },
  { name: 'Home & Kitchen', slug: 'home-kitchen' },
  { name: 'Fitness', slug: 'fitness' },
];

const products = [
  { name: 'Wireless Mouse', description: 'Ergonomic 2.4GHz wireless mouse, 1600 DPI', price: 24.99, stock: 50, category: 'Electronics', featured: true },
  { name: 'Mechanical Keyboard', description: 'RGB backlit mechanical keyboard with hot-swappable switches', price: 89.99, stock: 25, category: 'Electronics' },
  { name: '27" 4K Monitor', description: 'IPS panel, 99% sRGB, USB-C with 65W power delivery', price: 349.0, stock: 10, category: 'Electronics', featured: true },
  { name: 'Noise-Cancelling Headphones', description: 'Over-ear ANC headphones, 30h battery life', price: 199.0, stock: 15, category: 'Audio', featured: true },
  { name: 'Portable Bluetooth Speaker', description: 'Waterproof IPX7, 12h playback, 360° sound', price: 59.99, stock: 40, category: 'Audio' },
  { name: 'USB-C Microphone', description: 'Studio-quality condenser mic for podcasts and calls', price: 129.99, stock: 20, category: 'Audio' },
  { name: 'Smart Coffee Maker', description: 'Wi-Fi enabled, programmable, app control', price: 119.0, stock: 12, category: 'Home & Kitchen' },
  { name: 'Air Fryer 5L', description: '5L capacity, 8 presets, dishwasher-safe parts', price: 89.99, stock: 30, category: 'Home & Kitchen' },
  { name: 'Robot Vacuum', description: 'LiDAR navigation, 3000Pa suction, auto-return', price: 259.0, stock: 0, category: 'Home & Kitchen', featured: true },
  { name: 'Smart Fitness Watch', description: 'GPS, heart rate, sleep tracking, 7-day battery', price: 149.99, stock: 22, category: 'Fitness', featured: true },
  { name: 'Yoga Mat Pro', description: 'Non-slip 6mm mat with carry strap', price: 34.99, stock: 60, category: 'Fitness' },
  { name: 'Adjustable Dumbbells 24kg', description: '2.5-24kg per hand, compact design', price: 299.0, stock: 5, category: 'Fitness' },
];

const users = [
  { email: 'owner@example.com', name: 'Store Owner' },
  { email: 'customer1@example.com', name: 'Anna Novak' },
  { email: 'customer2@example.com', name: 'Petr Svoboda' },
];

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  for (const category of categories) {
    await prisma.category.create({ data: category });
  }
  const categoryBySlug = new Map(
    (await prisma.category.findMany()).map((c) => [c.slug, c.id]),
  );

  await prisma.product.createMany({
    data: products.map((p) => ({
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock,
      slug: slugify(p.name),
      imageUrl: `https://picsum.photos/seed/${slugify(p.name)}/600/600`,
      categoryId: categoryBySlug.get(slugify(p.category))!,
      isFeatured: p.featured ?? false,
    })),
  });

  await prisma.user.createMany({
    data: users,
  });

  const [productCount, categoryCount, userCount] = await prisma.$transaction([
    prisma.product.count(),
    prisma.category.count(),
    prisma.user.count(),
  ]);
  console.log(`Seeded ${productCount} products, ${categoryCount} categories, ${userCount} users`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
