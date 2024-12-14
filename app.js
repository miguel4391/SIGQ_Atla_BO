#!/usr/bin/env node


var express         = require("express"),
    bodyParser      = require("body-parser"),
    favicon         = require("express-favicon"),
    flash           = require("connect-flash"),
    passport        = require('passport'),
	LdapStrategy    = require('passport-ldapauth').Strategy;
    app             = express();


var indexRoutes = require("./routes/index");
var tipoRoutes  = require("./routes/tipos");
var DepartRoutes  = require("./routes/departamentos");


//var OPTS={
//	server:{
//		url: "ldap://10.200.0.5:389",
//		bindDN:"CN=Nuno Teste,OU=Docentes,OU=Utilizadores,DC=colaboradores,DC=universidadeeuropeia,DC=pt",
//		bindCredentials:"Europeia2019",
//		searchBase:"OU=Utilizadores,DC=colaboradores,DC=universidadeeuropeia,DC=pt",
//		searchFilter: '(sAMAccountName={{username}})'
//	}
//};


var session = require("express-session");
app.use(session({
    secret: 'login secret',
    resave: false,
    saveUninitialized: false,
    cookie: {httpOnly:true, maxAge: 2419200000} ///maxAge in miliseconds
}));

//passport.use(new LdapStrategy(OPTS));

app.use(favicon(__dirname + '/public/img/favicon.png'));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
//app.use(passport.initialize());
//app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/tipoFicheiros", tipoRoutes);
app.use("/departamentos", DepartRoutes);

app.listen(8084, () =>{
    console.log('Server Running on port 8084');
})
