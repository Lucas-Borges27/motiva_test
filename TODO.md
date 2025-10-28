# TODO: Fix CORS Error in Login API

## Steps:

- [x] 1. Edit motiva_test/src/app/api/usuarios/login/route.ts: Add OPTIONS handler for preflight and CORS headers to POST response.
- [x] 2. Edit motiva_test/src/app/login/page.tsx: Update apiUrl to use local proxy '/api/usuarios/login'.
- [ ] 3. Test the fix: Restart dev server if needed, launch browser to /login, submit form, verify no CORS errors in console and successful login.
