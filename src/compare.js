function compare(input) {

    maj = '+ '
    min = '- '
    aug = '+'
    dim = 'dim'
    m7 = '7'
    maj7 = 'maj7'
    flat5 = 'b5'
    sharp5 = '#5'

    major = {
        'notes': [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
        'name': 'Major',
        'harmony': [
            [maj + maj7],
            [min + m7],
            [min + m7],
            [maj + maj7],
            [maj + m7],
            [min + m7],
            [min + m7 + flat5]

        ],
        'color': "orange"

    } //major

    har_min = {
        'notes': [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
        'name': 'Harmonic Minor',
        'harmony': [
            [min + maj7],
            [min + m7 + flat5, min + dim + m7],
            [maj + aug + maj7],
            [min + m7, min + m7 + flat5, min + dim],
            [maj + m7, maj + aug + maj7],
            [maj + maj7, min + maj7, min + dim + m7, min + dim + maj7],
            [min + dim + m7, maj + aug, maj + aug + maj7]
        ],
        'color': "lightgreen"
    } //harmonic minor

    mel_min = {
        'notes': [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        'name': 'Melodic Minor',
        'harmony': [
            [min + maj7],
            [min + m7],
            [maj + aug + maj7],
            [maj + m7],
            [maj + m7, maj + aug + m7],
            [min + m7 + flat5],
            [min + m7 + flat5, maj + aug + m7]
        ],
        'color': "lightblue"
    } //melodic minor

    har_maj = {
        'notes': [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1],
        'name': 'Harmonic Major',
        'harmony': [
            [maj + maj7, maj + aug + maj7],
            [min + m7 + flat5],
            [min + m7, maj + m7],
            [min + maj7],
            [maj + m7],
            [maj + aug + maj7, min + dim + m7, min + dim + maj7],
            [min + dim + m7]
        ],
        'color': "pink"
    } //harmonic major

    dim_scl = {
        'notes': [1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
        'name': 'Diminished',
        'harmony': [
            [min + dim],
            [min + dim],
            [min + dim],
            [min + dim],
            [min + dim],
            [min + dim],
            [min + dim],
            [min + dim]
        ],
        'color': "silver"
    } //harmonic major

    compare_with = {
        // 'notes': [1,1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
        // 'notes': [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
        'notes': input,
        'name': 'Lydian'
    } //


    degrees = ['I', 'bII', 'II', 'bIII', 'III', 'IV', 'bV', 'V', 'bVI', 'VI', 'bVII', 'VII']
    min_deg = degrees.map(function(currentObject) {
        return currentObject.toLowerCase()
    });


    all_scales = [major, har_min, mel_min, har_maj, dim_scl]
    all_combinations = {
        'seed': [],
        'scales': [],
        'notes_index': [],
        'n_notcommon': [],
        'harmony': [],
        'color': []
    }

    function shift(arr, n) {
        sh = []
        // console.log(arr.length)
        for (i = 0; i < arr.length; i++) {
            sh.push(arr[i]);
        }
        for (i = 0; i < n; i++) {
            aux = sh.shift();
            sh.push(aux);
        }
        return sh;
    };

    function compare(a, b) {
        aux = 0
        for (l = 0; l < a.length; l++) {
            if (a[l] != b[l] && a[l] == 0) {
                aux++
            }
        }
        return (aux)
    }

    function get_notes_index(comb) {
        return comb.reduce(function(acc, curr, ind) {
            if (curr == 1) {
                acc.push(ind)
            }
            return acc
        }, [])
    }

    // new_har = all_scales[0]['harmony']
    for (k = 0; k < all_scales.length; k++) {
        new_har = all_scales[k]['harmony']
        for (j = 0; j < 12; j++) {

            new_comb = shift(all_scales[k]['notes'], j)
            if (j > 0 && shift(all_scales[k]['notes'], j - 1)[0] == 1) {
                new_har = shift(new_har, 1)
            } else {
                // new_har = all_scales[k]['harmony']
            }
            // new_har = shift(all_scales[k]['harmony'], j)
            all_combinations['seed'].push(all_scales[k]['name'])
            all_combinations['scales'].push(new_comb)
            all_combinations['n_notcommon'].push(compare(compare_with['notes'], new_comb))
            all_combinations['notes_index'].push(get_notes_index(new_comb))
            all_combinations['harmony'].push(new_har)
            all_combinations['color'].push(all_scales[k]['color'])
        }
    }
}
