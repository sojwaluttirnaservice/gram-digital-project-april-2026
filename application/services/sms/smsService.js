const DigiWeaponsService = require('./DigiWeaponsService');
const PinnacleService = require('./PinnacleService');

class SmsService {
    constructor() {
        const providerName = process.env.SMS_PROVIDER || 'digiweapons';
        this.setProvider(providerName);
    }

    setProvider(providerName) {
        switch (providerName.toLowerCase()) {
            case 'pinnacle':
                this.provider = new PinnacleService();
                this.providerName = 'pinnacle';
                break;
            case 'digiweapons':
            default:
                this.provider = new DigiWeaponsService();
                this.providerName = 'digiweapons';
                break;
        }
        console.log(`SmsService initialized with provider: ${this.providerName}`);
    }

    async sendSms(options) {
        return this.provider.sendSms(options);
    }

    async getDlr(scheduleId) {
        return this.provider.getDlr(scheduleId);
    }
}

module.exports = new SmsService();
