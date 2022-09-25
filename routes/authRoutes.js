const { Router } = require('express')
const authHandlers = require('../handlers/authHandlers')
const router = Router();


router.post('/api/register', authHandlers.register_post );
router.post('/api/login', authHandlers.login_post);



module.exports = router;