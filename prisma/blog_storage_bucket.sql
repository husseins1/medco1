-- Public bucket for blog cover images.
-- Reads go through the public URL; writes are performed server-side with the
-- service-role key from the local-only CMS.
--
-- This is NOT a Prisma migration because `storage.buckets` is a Supabase-managed
-- table that doesn't exist in Prisma's shadow database. Apply it once per project:
--   npx prisma db execute --file prisma/blog_storage_bucket.sql
insert into storage.buckets (id, name, public)
values ('blog', 'blog', true)
on conflict (id) do update set public = true;
