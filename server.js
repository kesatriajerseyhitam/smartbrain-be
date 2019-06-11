const bodyParser 	= require(`body-parser`);
const bcrypt			= require(`bcrypt-nodejs`);
const Clarifai		= require(`clarifai`);
const express    	= require(`express`);
const cors       	= require(`cors`);
const knex				= require(`knex`)
const app        	= express();
const port       	= process.env.PORT || 3000;

const profile 		= require(`./controller/profile`);
const signin 			= require(`./controller/signin`);
const signup 			= require(`./controller/signup`);

const db					= knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: true

	}
});
const database   	= {
	users: [
		{
			id: `123`,
			name: `John`,
			email: `john@gmail.com`,
			password: `cookies`,
			entries: 0,
			joined: new Date(),
		},
		{
			id: `124`,
			name: `Sally`,
			email: `sally@gmail.com`,
			password: `bananas`,
			entries: 0,
			joined: new Date(),
		}
	]
}
const clar 				= new Clarifai.App({
	apiKey: '81a0516f2aa24f68803f993de8d55d38'
});


app.use(bodyParser.json());
app.use(cors());

app.post(`/image`, (req, res) => image.detectImage(req, res, db, Clarifai))
app.put(`/image`, (req, res) => image.getEntries(req, res, db))
app.get(`/profile/:id`, (req, res) => profile.getProfile(req, res, db))
app.post(`/signin`, (req, res) => signin.handleSignin(req, res, db, bcrypt))
app.post(`/signup`, (req, res) => signup.handleSignup(req, res, db, bcrypt))


app.listen(port, () => {
	console.log(`App is running on port 3000`);
})