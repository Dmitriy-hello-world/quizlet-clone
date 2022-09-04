import chista from '../../chista.mjs';

import WordsCreate from '../../../../use-cases/main/words/Create.mjs';
import WordsDelete from '../../../../use-cases/main/words/Delete.mjs';
import WordsUpdate from '../../../../use-cases/main/words/Update.mjs';

export default {
    create : chista.makeUseCaseRunner(WordsCreate, req => req.body),
    update : chista.makeUseCaseRunner(WordsUpdate, req => ({ ...req.body, id: req.params.id })),
    delete : chista.makeUseCaseRunner(WordsDelete, req => ({ ...req.body, id: req.params.id }))
};
