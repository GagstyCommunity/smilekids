
revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated, service_role;

revoke execute on function public.handle_new_user() from public, anon, authenticated;
grant execute on function public.handle_new_user() to service_role;

revoke execute on function public.recompute_dentist_rating() from public, anon, authenticated;
grant execute on function public.recompute_dentist_rating() to service_role;
