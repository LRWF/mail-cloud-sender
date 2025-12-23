import { WorkerMailer } from "worker-mailer";

export default {
	async fetch(request, env) {
		const authHeader = request.headers.get("Authorization") || "";
		const token = authHeader.replace(/^Bearer\s+/i, "");

		if (!token || token !== env.API_TOKEN) {
			return new Response("Unauthorized", { status: 401 });
		}

		if (request.method !== "POST") {
			return new Response("Method not allowed", { status: 405 });
		}

		let data;
		try {
			data = await request.json();
		} catch {
			return new Response("Invalid JSON", { status: 400 });
		}

		const { host, port, username, password, name, to, cc, bcc, subject, content } = data;
		if (!host || !port || !username || !password || !to || !subject || !content) {
			return new Response("Missing required fields", { status: 400 });
		}

		const toList = to.split(",").map(s => s.trim()).filter(Boolean);
		const ccList = (cc || "").split(",").map(s => s.trim()).filter(Boolean);
		const bccList = (bcc || "").split(",").map(s => s.trim()).filter(Boolean);

		try {
			await WorkerMailer.send(
				{
					host: host,
					port: port,
					authType: 'login',
					credentials: {
						username: username,
						password: password,
					}
				},
				{
					from: { email: username, name: (name || username) },
					to: toList.map(email => ({ email })),
					cc: ccList.map(email => ({ email })),
					bcc: bccList.map(email => ({ email })),
					subject: subject,
					html: content,
				});

			return Response.json("Sent successfully", { status: 200 });
		} catch (err) {
			return Response.json(err.message.trim(), { status: 500 });
		}
	}
};
