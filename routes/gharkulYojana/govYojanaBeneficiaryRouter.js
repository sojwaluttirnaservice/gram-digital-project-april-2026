const getRouter = require('../../application/utils/getRouter');
const middleware = require('../middleware');
const govYojanaBeneficiaryController = require('../../application/controllers/govYojanaBeneficiaryController');

const govYojanaBeneficiaryRouter = getRouter();

govYojanaBeneficiaryRouter.get(
	'/',
	govYojanaBeneficiaryController.getBeneficiaryListView
);

govYojanaBeneficiaryRouter.post(
	'/',
	govYojanaBeneficiaryController.createBeneficiaryList
);

govYojanaBeneficiaryRouter.put(
	'/',
	govYojanaBeneficiaryController.updateBeneficiaryList
);

govYojanaBeneficiaryRouter.delete(
	'/',
	govYojanaBeneficiaryController.deleteBeneficiaryList
);

module.exports = govYojanaBeneficiaryRouter;
