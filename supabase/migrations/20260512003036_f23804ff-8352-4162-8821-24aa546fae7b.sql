insert into storage.buckets (id, name, public)
values ('content-images', 'content-images', true)
on conflict (id) do nothing;

create policy "Content images public read"
on storage.objects for select
using (bucket_id = 'content-images');

create policy "Admin upload content images"
on storage.objects for insert
with check (bucket_id = 'content-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admin update content images"
on storage.objects for update
using (bucket_id = 'content-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admin delete content images"
on storage.objects for delete
using (bucket_id = 'content-images' and public.has_role(auth.uid(), 'admin'));