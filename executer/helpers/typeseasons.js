const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

module.exports = class Funtan {

    constructor (client) {
        this.client = client;
    };

    static kanalbul(kanal) {
        const adapterchannels = new FileSync('../../AgenaBase/kanallar.json');
        const kanallar = low(adapterchannels);
        
        var sonuc = kanallar.get(kanal).value();
        console.log(sonuc);

        return sonuc;

    };

    static rolbul(rol) {
        const adapterroles = new FileSync('../../AgenaBase/roller.json');
        const roller = low(adapterroles);
        
        var sonuc = roller.get(rol).value();
        console.log(sonuc);

        return sonuc;

    };



}