const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const mongoose = require('mongoose');
const Users = require('../../../api/v1/users/model');
const { urlDB, jwtSecret, urlDBTest } = require('../../../config');
const app = require('../../../../app');
const jwt = require('jsonwebtoken')

chai.use(chaiHttp);
const { expect } = chai;

const secretKey = jwtSecret; // Use the same secret key as in your middleware
const token = jwt.sign({ emailAddress: 'arain@gmail.com' }, secretKey, { expiresIn: '1h' });

describe('Users CRUD operation ', () => {
    before((done) => {
        mongoose.connect(urlDBTest, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            done();
        }).catch((err) => {
            done(err)
        })
    });

    after((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(() => done());
        });
        done()
    });

    let accountNumber;
    let userId;
    const user = {userName: 'arain', emailAddress: 'arain@gmail.com', accountNumber: 1, identityNumber: 1, password: 'btpn'};

    it('should create a new users', (done) =>{
        chai.request(app)
            .post('/api/v1/users')
            .send(user)
            .end((err, res) => {
                expect(res).to.be.have.status(200);
                expect(res.body.data).to.be.an('object');
                expect(res.body.data).to.have.property('accountNumber');
                accountNumber = res.body.data.accountNumber;
                console.log('asdasdasd', res.body.data._id);
                userId = res.body.data._id;
                done();
            })
    })

    it('should be failed when create a new users with existing account number with message `Users duplicated!` ', (done) =>{
        chai.request(app)
            .post('/api/v1/users')
            .send(user)
            .end((err, res) => {
                expect(res).to.be.have.status(400);
                expect(res.body.msg).to.equal('Users duplicated!');
                done();
            })
    })

    it('should get users by accountNumber', (done) => {
        chai.request(app)
            .get(`/api/v1/users/${accountNumber}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.be.have.status(200);
                done()
            })
    });

    it('should get all users', (done) => {
        chai.request(app)
            .get('/api/v1/users')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.be.have.status(200);
                done();
            })
    })

    it('should soft delete a user by Id user', (done) =>{
        console.log('function deleted ', `/api/v1/users/${userId}`);
        chai.request(app)
            .delete(`/api/v1/users-delete/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                console.log('response function delete ',res.status);
                expect(res).to.have.status(200);
                done();
            })
    })
})