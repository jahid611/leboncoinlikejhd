// test/api.test.js
import request from 'supertest';
import { expect } from 'chai';
import app from '../server.js'; // Assure-toi que server.js exporte l'app Express

describe('API Tests - 10 premiers modules', function() {
  let token;
  let userId;
  let categoryId;
  let annonceId;

  // Test de la route de base
  it('GET / should return welcome message', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.include('Bienvenue sur l’API LeBonCoinLike');
        done();
      });
  });

  // Inscription
  it('POST /api/auth/register should create a new user', function(done) {
    request(app)
      .post('/api/auth/register')
      .send({
        username: 'TestUser',
        email: 'testuser@example.com',
        password: 'test123'
      })
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.have.property('message').that.includes('Utilisateur');
        userId = res.body.id;
        done();
      });
  });

  // Connexion
  it('POST /api/auth/login should login and return a token', function(done) {
    request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'test123'
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('token');
        token = res.body.token;
        done();
      });
  });

  // Création d'une catégorie
  it('POST /api/categories should create a new category', function(done) {
    request(app)
      .post('/api/categories')
      .send({
        name: 'TestCategory',
        description: 'Catégorie pour test'
      })
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.have.property('id');
        categoryId = res.body.id;
        done();
      });
  });

  // Liste des catégories
  it('GET /api/categories should list categories', function(done) {
    request(app)
      .get('/api/categories')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // Création d'une annonce
  it('POST /api/annonces should create a new annonce', function(done) {
    request(app)
      .post('/api/annonces')
      .set('Authorization', 'Bearer ' + token)
      .send({
        title: 'Test Annonce',
        description: 'Description de test',
        price: 100,
        user_id: userId,
        category_id: categoryId,
        location: 'TestCity'
      })
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.have.property('id');
        annonceId = res.body.id;
        done();
      });
  });

  // Ajout d'un favori
  it('POST /api/favorites should add an annonce to favorites', function(done) {
    request(app)
      .post('/api/favorites')
      .set('Authorization', 'Bearer ' + token)
      .send({ annonce_id: annonceId })
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.have.property('message').that.includes('Favori ajouté');
        done();
      });
  });

  // Envoi d'un message
  it('POST /api/messages should send a message', function(done) {
    request(app)
      .post('/api/messages')
      .set('Authorization', 'Bearer ' + token)
      .send({
        receiver_id: userId, // Pour le test, envoyer un message à soi-même
        content: 'Bonjour, ceci est un test de message.'
      })
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.have.property('message').that.includes('Message envoyé');
        done();
      });
  });

  // Ajout d'un commentaire à une annonce
  it('POST /api/comments/annonce/:annonceId should add a comment', function(done) {
    request(app)
      .post(`/api/comments/annonce/${annonceId}`)
      .set('Authorization', 'Bearer ' + token)
      .send({ comment_text: 'Ceci est un commentaire test.' })
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.have.property('message').that.includes('Commentaire ajouté');
        done();
      });
  });

  // Création d'un report (signalement)
  it('POST /api/reports should create a new report', function(done) {
    request(app)
      .post('/api/reports')
      .set('Authorization', 'Bearer ' + token)
      .send({
        annonce_id: annonceId,
        reported_user_id: userId, // Pour le test, signaler soi-même
        reason: 'Test Report',
        description: 'Ceci est un signalement de test'
      })
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.have.property('message').that.includes('Report créé');
        done();
      });
  });
});
