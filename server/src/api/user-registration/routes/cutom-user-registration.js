module.exports = {
	routes: [
		{
			method: "POST",
			path: "/user-registrations/verifytoken",
			handler: "user-registration.verifyToken",
            config: {
                auth: false,
            }
		}
    ]
}