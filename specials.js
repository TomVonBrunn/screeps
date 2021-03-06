var exportCode = {

    // RUN zone receives Memory.zones[i]
getZoneName: function(){
    var lugar = [
        'bog',
        'marshland',
        'morass',
        'mud',
        'quagmire',
        'bottoms',
        'fen',
        'glade',
        'marsh',
        'mire',
        'moor',
        'polder',
        'quag',
        'slough',
        'swale',
        'swampland',
        'everglade',
        'holm',
        'muskeg',
        'peat bog',
        'acropolis',
        'alcazar',
        'citadel',
        'donjon',
        'fastness',
        'fort',
        'fortification',
        'fortress',
        'hold',
        'keep',
        'manor',
        'mansion',
        'palace',
        'peel',
        'safehold',
        'seat',
        'stronghold',
        'tower',
        'villa',
        'château',
        'estate house',
        'fasthold',
        'brood',
        'colony',
        'gaggle',
        'herd',
        'legion',
        'multitude',
        'throng',
        'army',
        'assembly',
        'bevy',
        'cloud',
        'collection',
        'company',
        'convoy',
        'crowd',
        'crush',
        'drift',
        'drove',
        'flight',
        'gathering',
        'group',
        'host',
        'litter',
        'mass',
        'pack',
        'progeny',
        'rout',
        'scores',
        'skein',
    ];
    var carácter = [
        'divine',
        'metaphysical',
        'sacred',
        'devotional',
        'holy',
        'intangible',
        'airy',
        'asomatous',
        'discarnate',
        'disembodied',
        'ethereal',
        'extramundane',
        'ghostly',
        'immaterial',
        'incorporeal',
        'nonmaterial',
        'nonphysical',
        'platonic',
        'pure',
        'rarefied',
        'refined',
        'supernal',
        'unfleshly',
        'unphysical',
        'accidental',
        'aimless',
        'arbitrary',
        'incidental',
        'indiscriminate',
        'irregular',
        'odd',
        'unplanned',
        'adventitious',
        'casual',
        'contingent',
        'designless',
        'desultory',
        'driftless',
        'fluky',
        'fortuitous',
        'hit-or-miss',
        'objectless',
        'promiscuous',
        'purposeless',
        'slapdash',
        'spot',
        'stray',
        'unaimed',
        'unconsidered',
        'unpremeditated',
        'baffling',
        'cryptic',
        'curious',
        'dark',
        'enigmatic',
        'inexplicable',
        'inscrutable',
        'magical',
        'mystical',
        'mystifying',
        'obscure',
        'perplexing',
        'puzzling',
        'secretive',
        'strange',
        'unknown',
        'weird',
        'abstruse',
        'alchemistic',
        'arcane',
        'astrological',
        'cabalistic',
        'covert',
        'difficult',
        'enigmatical',
        'equivocal',
        'esoteric',
        'furtive',
        'hidden',
        'impenetrable',
        'incomprehensible',
        'insoluble',
        'necromantic',
        'occult',
        'oracular',
        'recondite',
        'sphinxlike',
        'spiritual',
        'subjective',
        'symbolic',
        'transcendental',
        'uncanny',
        'unfathomable',
        'unknowable',
        'unnatural',
        'veiled',        
    ];
    return carácter[Math.floor(Math.random()*carácter.length)] + ' ' + lugar[Math.floor(Math.random()*lugar.length)];
},

};
module.exports = exportCode;