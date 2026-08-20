-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'ADMIN', 'SUPERADMIN');

-- Add column with temporary default so existing rows get a value,
-- then drop the default (real hashes come from seed/registration).
ALTER TABLE "User" ADD COLUMN "passwordHash" TEXT NOT NULL DEFAULT 'temporary';
ALTER TABLE "User" ALTER COLUMN "passwordHash" DROP DEFAULT;

-- AddRole
ALTER TABLE "User" ADD COLUMN "role" "Role" NOT NULL DEFAULT 'CUSTOMER';