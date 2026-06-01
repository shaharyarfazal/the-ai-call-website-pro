
-- 1. Bookings: remove public anon visibility & lock down inserts
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
CREATE POLICY "Users can view their own bookings"
  ON public.bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create bookings" ON public.bookings;
CREATE POLICY "Authenticated users can create their own bookings"
  ON public.bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- 2. Profiles: only authenticated users can read profiles
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
CREATE POLICY "Authenticated users can view profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

-- 3. user_roles: explicit restrictive policies to prevent privilege escalation
CREATE POLICY "Only admins can insert user roles"
  ON public.user_roles AS RESTRICTIVE FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Only admins can update user roles"
  ON public.user_roles AS RESTRICTIVE FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Only admins can delete user roles"
  ON public.user_roles AS RESTRICTIVE FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 4. website_settings: restrict to authenticated role (no anon)
DROP POLICY IF EXISTS "Admin can manage website settings" ON public.website_settings;
CREATE POLICY "Admin can manage website settings"
  ON public.website_settings FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 5. Storage policies for the private csvvvv bucket — admin-only access
CREATE POLICY "Admins can read csvvvv files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'csvvvv' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can upload csvvvv files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'csvvvv' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update csvvvv files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'csvvvv' AND public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (bucket_id = 'csvvvv' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete csvvvv files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'csvvvv' AND public.has_role(auth.uid(), 'admin'::public.app_role));
