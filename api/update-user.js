export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { id, email, password, role, nombre, rfc } = req.body;
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

    const body = {
      email,
      user_metadata: { role, nombre, rfc }
    };
    if (password) body.password = password;

    const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SECRET_KEY,
        'Authorization': `Bearer ${SUPABASE_SECRET_KEY}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || data.error_description || 'Error al actualizar usuario' });
    }

    return res.status(200).json({ id: data.id, email: data.email });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
