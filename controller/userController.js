export const join = (req, res) => res.render("join", {pageTitle:'join'});
export const login = (req, res) => res.render("login", {pageTitle:'login'});
export const logout = (req, res) => res.send("Logout");