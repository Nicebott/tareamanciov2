const BAD_WORDS = [
  'mamaguevo',
  'mmg',
  'gay',
  'lesbiana',
    'maricon',
      'estupido',
        'ñema',
          'pajaro',
            'lesbiana',
              'mamañema',
                'pene',
                  'toto',
                    'vagina',
                      'guevo',
];

export function censorMessage(text: string): string {
  let censored = text;
  BAD_WORDS.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const stars = '*'.repeat(word.length);
    censored = censored.replace(regex, stars);
  });
  return censored;
}
