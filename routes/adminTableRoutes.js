const { Router } = require('express')
const adminTableHandlers = require('../handlers/adminTableHandlers');
const { requireAuth, requireNotBlocked } = require('../middleware/authMiddleware');
const router = Router();

router.get('/api/admin', requireAuth , requireNotBlocked, adminTableHandlers.table_get);
router.put('/api/admin', requireAuth , requireNotBlocked, adminTableHandlers.table_update);
router.delete('/api/admin', requireAuth , requireNotBlocked, adminTableHandlers.table_delete);

module.exports = router;