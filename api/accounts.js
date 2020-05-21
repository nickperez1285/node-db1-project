const express = require('express');
const router = express.Router();
const db = require("../data/dbConfig.js");


router.get('/', async (req, res) => {
	try{
  		const accts = await db('accounts')
        res.status(200).json(accts);
    }
    catch{
    	res.status(500).json({ message: 'Could not retrieve  accounts' })
    }

    // .then(accounts => {
    //   res.status(200).json(accounts);
    // })
    // .catch(() => {
    //   res
    //     .status(500)
    //     .json({ message: 'Could not retrieve the list of accounts' });
    // });
});

router.get('/:id', (req, res)=> {
	const acctId = req.params.id 
	db('accounts').where({id: acctId})
	.then(accts => { 
		res.status(200).json(accts)

	})
	.catch( err => {
		res.stats(404).json({ message: 'Could not retrieve  account' })
	})


})

router.post('/', (req,res) => {
	if(!req.body.name || !req.body.budget){
		res.status(400).json({
	     message: 'Please provide both the name and budget for the account',
	    });
	} else {
		db("accounts").insert(req.body)
		.then( acct => {
			res.status(201).json(acct)
		})
		.catch( err => {
			res.status(500).json({ message: 'Could not add the account' })
		})
	}

})


 

router.put('/:id', (req, res) => {
	const acctID = req.params.id
  db('accounts')
    .where({ id: acctID })
    .update(req.body)
    .then(acct => {
      if (acct) {
        res.status(200).json({ message:  'updated' });
      } else {
        res.status(404).json({ message: 'Account not found' });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Update failed' });
    });
})

router.delete('/:id', (req, res) => {
	const acctID = req.params.id
  db('accounts')
    .where({ id: acctID })
    .del()
    .then(acct => {
      res.status(200).json({ message:'deleted' });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
module.exports = router;