-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_server_id_fkey";

-- DropForeignKey
ALTER TABLE "credits" DROP CONSTRAINT "credits_server_id_fkey";

-- AddForeignKey
ALTER TABLE "credits" ADD CONSTRAINT "credits_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "servers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "servers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
