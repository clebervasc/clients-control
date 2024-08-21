-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_server_id_fkey";

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "servers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
