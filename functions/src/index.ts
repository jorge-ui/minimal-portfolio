import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import fetch from 'node-fetch';
import * as jsdom from 'jsdom';
import AppError from "./types/AppError";
import FileData from "./types/FileData";
import ObjectivesData from "./types/ObjectivesData";

const { JSDOM } = jsdom;
const {document: dom} = new JSDOM('').window

const app = express();
app.use(cors({ origin: true }));

let fireApp: admin.app.App;

if (app.get('env') === 'development') {
	console.info("running on 'development' mode")
	const serviceAccount = require("../minimal-portfolio-4b77d-firebase-adminsdk-7nces-a11009a9e0.json");

	fireApp = admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: "https://minimal-portfolio-4b77d.firebaseio.com",
		storageBucket: "minimal-portfolio-4b77d.appspot.com"
	});

} else {
	fireApp = admin.initializeApp();
}

const db = fireApp.firestore();
const bucket = fireApp.storage().bucket();


app.use(errorHandling);

app.get('/projects', async (req, resp, next) => {

	const projects: any[] = [];

	try {
		const projectsSnapshot = await db
			.collection('projects')
			.orderBy("id", "desc")
			.get();

		projectsSnapshot.forEach(doc => {
			projects.push(doc.data());
		})

		return resp.json(projects)
	}
	catch (e) {
		console.error(e)
		next(new AppError(e.message, 500))
		return
	}
});

app.get('/tools', async (req, res, next) => {

	const tools: any[] = [];

	try {
		const toolsSnapshot = await db.collection("tools").get();

		toolsSnapshot.forEach(doc => {
			tools.push(doc.data())
		})

		return res.json(tools);
	}
	catch (e) {
		console.error(e)
		next(new AppError(e.message, 500))
		return
	}
});

app.get('/objective', async (req, res, next) => {
	try {
		const htmlSnap = await db.collection('objective').doc('html').get();
		const content = htmlSnap.data()!.content;
		return res.send(content);
	}
	catch (e) {
		console.error(e);
		next(new AppError(e.message, 500));
		return;
	}
})

app.get('/resume.pdf', async (req, res, next) => {
	try {
		const [,data] = await bucket.file('resume.pdf').get() as unknown as [any, FileData];
		const pdfTarget = `https://firebasestorage.googleapis.com/v0/b/${data.bucket}/o/${data.name}?alt=media&token=${data.metadata.firebaseStorageDownloadTokens}`;
		const pdfResponse = await fetch(pdfTarget);
		const pdfData = await pdfResponse.buffer()

		return res.status(200)
			.type('application/pdf')
			.set('Content-disposition', 'inline; filename*=utf-8\'\'resume.pdf')
			.set('Content-Length', pdfData.byteLength.toString())
			.send(pdfData);
	}
	catch (e) {
		console.error(e)
		next(new AppError(e.message, 500))
		return;
	}
})


function errorHandling(err: AppError, req: any, res: any, next: () => void) {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	res.status(err.statusCode).json({
		status: err.status,
		message: err.message
	});
	void next; // so linter don't complain unused arg
}

export const api = functions.https.onRequest(app);

export const onObjectiveUpdate = functions.firestore.document('/objective/data').onUpdate(({ after }) => {
	const newDoc = after.data() as ObjectivesData;
	const length = Object.keys(newDoc.elements).length

	const mainDiv = dom.createElement('div');

	for (let i = 0; i < length; i++) {
		const elementData = newDoc.elements[i];
		const element = dom.createElement(elementData.type);
		element.innerHTML = elementData.innerHTML;
		mainDiv.appendChild(element)
	}

	return db.collection('objective').doc('html').set({
		content: `<div>${mainDiv.innerHTML}</div>`
	})
})


