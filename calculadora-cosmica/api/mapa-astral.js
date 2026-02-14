export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { day, month, year, hour, min, city, subject } = req.body;

    const apiKey = process.env.ASTRO_API_IO_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "API Key não configurada" });
    }

    const response = await fetch("https://api.astrology-api.io/api/v3/charts/natal", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": apiKey
  },
  body: JSON.stringify({
    subject: {
      name: subject,
      birth_data: {
  year,
  month,
  day,
  hour,
  minute: min,
  second: 0,
  city,
  country_code: "BR"
}
    }
  })
});
    const data = await response.json();

    if (!response.ok) {
  return res.status(response.status).json(data);
}

return res.status(200).json(data);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao calcular o mapa"
    });
  }
}
