import express from 'express';
import { singleDownload } from '../controller/admin';
const router = express.Router();

/* GET home page. */
router.post('/', function(req, res,) {
  res.send('I am connected to the PostgresSql database succefully');
});

router.get('/download-pdf', singleDownload);

export default router;