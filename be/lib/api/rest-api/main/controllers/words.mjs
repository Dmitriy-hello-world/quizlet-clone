import chista from '../../chista.mjs';

import WordsCreate from '../../../../use-cases/main/words/Create.mjs';
import WordsDelete from '../../../../use-cases/main/words/Delete.mjs';
import WordsUpdate from '../../../../use-cases/main/words/Update.mjs';
import WordsList   from '../../../../use-cases/main/words/List.mjs';
import WordsResponse from '../../../../use-cases/main/words/Response.mjs';

export default {
    create   : chista.makeUseCaseRunner(WordsCreate, req => req.body),
    update   : chista.makeUseCaseRunner(WordsUpdate, req => ({ ...req.body, id: req.params.id })),
    list     : chista.makeUseCaseRunner(WordsList, req => ({ ...req.query, ...req.params })),
    response : chista.makeUseCaseRunner(WordsResponse, req => ({ ...req.body, ...req.params })),
    delete   : chista.makeUseCaseRunner(WordsDelete, req => ({ ...req.body, id: req.params.id }))
};
