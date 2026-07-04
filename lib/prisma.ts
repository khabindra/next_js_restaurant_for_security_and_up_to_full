
// lib/prisma.ts

// import { PrismaClient } from '@/app/generated/prisma/client'; // ⚡ Crucial: Imports from your custom output location
// import { PrismaPg } from '@prisma/adapter-pg';
// import pg from 'pg';

// const prismaClientSingleton = () => {
//   // 1. Establish the connection pool via native pg driver
//   const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  
//   // 2. Instantiate the Prisma 7 Driver Adapter
//   const adapter = new PrismaPg(pool);
  
//   // 3. Inject the driver adapter into your custom generated client instance
//   return new PrismaClient({ adapter });
// };

// declare global {
//   var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
// }

// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// export default prisma;

// if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;



// lib/prisma.ts
import { PrismaClient } from '@/app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

declare global {
  // Cache both the client and the pool globally
  var prismaGlobal: undefined | PrismaClient;
  var prismaPoolGlobal: undefined | pg.Pool;
}

// 1. Reuse or create the native Postgres connection pool
const pool = globalThis.prismaPoolGlobal ?? new pg.Pool({ 
  connectionString: process.env.DATABASE_URL 
});

// 2. Wrap it inside the Prisma 7 Driver Adapter
const adapter = new PrismaPg(pool);

// 3. Reuse or create the client
const prisma = globalThis.prismaGlobal ?? new PrismaClient({ adapter });

export default prisma;

// 4. Bind to global scope in development to prevent hot-reload leaks
if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
  globalThis.prismaPoolGlobal = pool;
}