export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { email, password, role, nombre, rfc } = req.body;

    const response = await fetch('https://kyxedjejepgfxynfzxfi.supabase.co/auth/v1/admin/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'sb_secret_9gx5voEieu9xvBW7RcC6hA_wLC1fh_5',
        'Authorization': 'Bearer sb_secret_9gx5voEieu9xvBW7RcC6hA_wLC1fh_5'
      },
      body: JSON.stringify({
        email,
        password,
        email_confirm: true,
        user_metadata: { role, nombre, rfc }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || data.error_description || 'Error al crear usuario' });
    }

    return res.status(200).json({ id: data.id, email: data.email });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
