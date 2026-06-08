# Supabase Setup — VEXALED

You keep ownership of the project and all keys. Follow these steps once.

## 1. Create the project
1. Go to https://supabase.com → **New project**.
2. **Region: `Central EU (Frankfurt)`** — important for GDPR / European clients.
3. Set a strong database password (save it in your password manager).
4. Wait for the project to finish provisioning (~2 min).

## 2. Run the schema
1. In the dashboard: **SQL Editor → New query**.
2. Open `supabase/schema.sql` from this repo, copy everything, paste, **Run**.
3. You should see "Success. No rows returned." This creates all tables, RLS
   policies, the storage bucket, and the admin-role plumbing.

## 3. Create your admin user
1. **Authentication → Users → Add user** → enter your email + a password
   (or use "Send invite").
2. A `profiles` row is created automatically. Promote yourself to admin:
   **SQL Editor → New query →**
   ```sql
   update public.profiles set role = 'admin' where email = 'you@vexaled.com';
   ```

## 4. Grab your keys
**Project Settings → API**, copy these into `.env.local` (see `.env.local.example`):

| Value | Env var | Notes |
|---|---|---|
| Project URL | `NEXT_PUBLIC_SUPABASE_URL` | safe for browser |
| `anon` public key | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | safe for browser |
| `service_role` key | `SUPABASE_SERVICE_ROLE_KEY` | **server-only secret — never expose to the browser** |

## 5. (Optional) Email for lead notifications
We'll use Resend for sending the autoresponder + sales notification. When ready,
create an account at https://resend.com, verify the `vexaled.com` domain, and add
`RESEND_API_KEY` to `.env.local`.

---
Once `.env.local` is filled in, tell me and I'll wire the app to live data
(product pages + admin + contact form).
