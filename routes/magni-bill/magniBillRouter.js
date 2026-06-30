const magniBillController = require('../../application/controllers/magni-bill/magniBillController');
const getRouter = require('../../application/utils/getRouter');
const mangiBillRouter = getRouter();

mangiBillRouter.get('/', magniBillController.renderMagniBillPage);

mangiBillRouter.get(
	'/print-watertax-magni-bill',
	magniBillController.printWatertaxMagniBill
);

mangiBillRouter.get(
	'/print-magni-bill-other',
	magniBillController.printMagniBillOther
);

mangiBillRouter.get(
	'/print-bank-qr-code-magni-bill-other',
	magniBillController.printQrCodeMagniBillOther
);

mangiBillRouter.get(
	'/print-9-c-bank-magni-bill',
	magniBillController.print9CBankMagniBill
);

mangiBillRouter.get(
	'/print-9-c-magni-bill',
	magniBillController.print9CMagniBill
);

module.exports = mangiBillRouter;
