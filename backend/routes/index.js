const express = require('express');
const controller = require('../controller/Clogdata');
const controller2 = require('../controller/Cdbregister');
const controller3 = require('../controller/Cdbfindlog');
const controller4 = require('../socketio/chat');
const router = express.Router();

router.get('/movieAPI', controller.Naver);
router.get('/bookAPI', controller.Aladin);
router.get('/performanceAPI', controller.Kopis);

router.post('/performanceDB', controller2.PerfoDB);
router.post('/movieDB', controller2.MovieDB);
router.post('/bookDB', controller2.BookDB);

router.get('/fromDB', controller3.fromDB);
router.get('/fromDBAll', controller3.fromDBAll);
router.get('/logOfyear', controller3.logOfyear);
router.get('/DBAll', controller3.DBAll);
router.delete('/DBdelete', controller3.DBdelete);

// router.get('/chatMessageAlarm', controller4.socketMessageAlarmCheck);
// router.patch('/chatMessageAlarm', controller4.socketMessageAlarmCheck);
router.get('/alarmRoomListCall', controller4.alarmRoomListCall);
module.exports = router;
