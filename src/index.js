import { WorkerMailer } from "worker-mailer";

export default {
	async fetch(request, env) {
		const authHeader = request.headers.get("Authorization") || "";
		const token = authHeader.replace(/^Bearer\s+/i, "");

		if (!token || token !== env.API_TOKEN) {
			return Response.json(
				{
					code: 401,
					msg: "Unauthorized"
				}
			);
		}

		if (request.method !== "POST") {
			return Response.json(
				{
					code: 405,
					msg: "Method not allowed"
				}
			);
		}

		let data;
		try {
			data = await request.json();
		} catch {
			return Response.json(
				{
					code: 400,
					msg: "Invalid JSON"
				}
			);
		}

		const { host, port, username, password, name, to, cc, bcc, subject, content } = data;
		if (!host || !port || !username || !password || !to || !subject || !content) {
			return Response.json(
				{
					code: 400,
					msg: "Missing required fields"
				}
			);
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
					text: content,
				});

			return Response.json(
				{
					code: 200,
					msg: "Sent successfully"
				}
			);
		} catch (err) {
			return Response.json(
				{
					code: 500,
					msg: err.message.trim()
				}
			);
		}
	}
};
