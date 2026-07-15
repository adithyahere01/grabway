import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const dbUrl = process.env.DATABASE_URL!;
  let adapterConfig: Record<string, unknown>;

  if (dbUrl.startsWith("mysql://") || dbUrl.startsWith("mariadb://")) {
    const url = new URL(dbUrl);
    adapterConfig = {
      host: url.hostname || "localhost",
      port: parseInt(url.port || "3306", 10),
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      database: url.pathname.slice(1),
    };
  } else {
    adapterConfig = { socketPath: dbUrl };
  }

  if (process.env.DATABASE_SOCKET) {
    adapterConfig.socketPath = process.env.DATABASE_SOCKET;
    delete adapterConfig.host;
    delete adapterConfig.port;
  }

  console.log("DB connecting to:", adapterConfig.host || adapterConfig.socketPath, "database:", adapterConfig.database);

  const adapter = new PrismaMariaDb(adapterConfig as never);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
