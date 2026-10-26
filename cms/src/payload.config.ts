import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { Users } from "./collections/Users";
import { Players } from "./collections/Players";
import { Trainings } from "./collections/Trainings";
import { Competitions } from "./collections/Competitions";
import { Pages } from "./collections/Pages";
import { Media } from "./collections/Media";
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3001",
  admin: { user: Users.slug },
  collections: [Users, Players, Trainings, Competitions, Pages, Media],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "development-only-secret-change-this-before-deploying",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_W7Pn4TmzDbAc@ep-divine-shape-b4g2dlgd-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require" },
    push: process.env.NODE_ENV !== "production"
  }),
  upload: { limits: { fileSize: 5_000_000 } }
});
