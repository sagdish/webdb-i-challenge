const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/account', (req, res) => {
  db('accounts')
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => res.status(500).json(err));
});

server.get('/account/:id', (req, res) => {
  const { id } = req.params;

  db('accounts').where({id})
    .then(account => {
      if (account.length) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ message: `no info with id ${id}` })
      }
    })
    .catch(err => res.status(500).json(err));

});

server.post('/account', (req, res) => {
  const account = req.body;

  db('accounts').insert(account)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => res.status(500).json(err));

});

server.put('/account/:id', (req, res) => {
  const editedAccount = req.body;
  const { id } = req.params;

  db('accounts').update(editedAccount).where({id})
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ error: `no record with id ${id}` });
      }
    })
    .catch(err => res.status(500).json(err));

});

server.delete('/account/:id', (req, res) => {
  const { id } = req.params;
  db('accounts').where({id}).del()
  .then(count => {
    if (count) {
      res.status(200).json({deleted: count});
    } else {
      res.status(404).json({ error: `no record with id ${id}` });
    }
  })
  .catch(err => res.status(500).json(err));
});

module.exports = server;